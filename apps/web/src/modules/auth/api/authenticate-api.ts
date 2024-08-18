import { api } from "@/libs/axios";

export interface AuthenticateProps {
  ip: string;
}

export interface AuthenticateResponse {
  token: string;
}

export async function authenticateApi({ ip }: AuthenticateProps): Promise<AuthenticateResponse> {
  try {
    const response = await api.post('/authenticate', {
      ip
    });
    const { token } = response.data
    return { token };
  } catch (error) {
    console.error('Failed to login:', error)
    throw error
  }
}