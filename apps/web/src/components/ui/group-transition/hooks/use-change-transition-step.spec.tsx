import { act, renderHook } from '@testing-library/react'

import { GroupTransitionProvider } from '../context/group-transition-context'
import { useChangeTransitionStep } from './use-change-transition-step'

type Step = 'initial' | 'next' | 'previous'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <GroupTransitionProvider<Step> initialStep="initial">
    {children}
  </GroupTransitionProvider>
)

describe('useChangeTransitionStep', () => {
  it('should navigate to next step', () => {
    const { result } = renderHook(() => useChangeTransitionStep<Step>(), {
      wrapper,
    })

    act(() => {
      result.current.navigateToNextComponent('next')
    })

    expect(result.current.currentStep).toBe('next')
    expect(result.current.enterAnimation).toBe('animate-from-right-to-current')
    expect(result.current.existAnimation).toBe('animate-from-current-to-left')
  })

  it('should navigate to previous step', () => {
    const { result } = renderHook(() => useChangeTransitionStep<Step>(), {
      wrapper,
    })

    act(() => {
      result.current.navigateToPreviousComponent('previous')
    })

    expect(result.current.currentStep).toBe('previous')
    expect(result.current.enterAnimation).toBe('animate-from-left-to-current')
    expect(result.current.existAnimation).toBe('animate-from-current-to-right')
  })
})
