import { useMutation } from '@tanstack/react-query'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { authenticateApi, AuthenticateProps } from '../api/authenticate-api'
import { useUserIp } from '../hooks/use-user-ip'

const AuthContext = createContext<Session>({} as Session)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { getUserIp } = useUserIp()
  const [session, setSession] = useState<Session>({
    isAuthenticated: false,
    sub: undefined,
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: ({ ip }: AuthenticateProps) => authenticateApi({ ip }),
    onSuccess: (data) => {
      return data
    },
    onError: (error) => {
      console.error('Failed to login:', error)
      throw error
    },
  })

  const authenticateWithIp = useCallback(async () => {
    try {
      const { ip } = getUserIp()
      const { token } = await authenticate({ ip })

      localStorage.setItem('authToken', token)
      setSession({ isAuthenticated: true, sub: token })
    } catch (error) {
      console.error('Failed to login:', error)
      throw error
    }
  }, [authenticate, getUserIp])

  useEffect(() => {
    const authToken = localStorage.get('authToken')
    if (!authToken) {
      ;(async () => authenticateWithIp())()
    }
  }, [authenticateWithIp, session.isAuthenticated])

  return (
    <AuthContext.Provider value={{ ...session }}>
      {children}
    </AuthContext.Provider>
  )
}
