/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useContext, useReducer } from 'react'

export type TransitionAnimationDirection =
  | 'animate-from-left-to-current'
  | 'animate-from-current-to-left'
  | 'animate-from-current-to-right'
  | 'animate-from-right-to-current'

interface GroupTransitionContextData<TransitionStep> {
  currentStep: TransitionStep
  enterAnimation: TransitionAnimationDirection | undefined
  existAnimation: TransitionAnimationDirection | undefined
  handleSetCurrentStep: (currentStep: TransitionStep) => void
  handleSetEnterAnimation: (
    enterAnimation: TransitionAnimationDirection
  ) => void
  handleSetExistAnimation: (
    existAnimation: TransitionAnimationDirection
  ) => void
}

interface GroupTransitionProviderProps<TransitionStep> {
  children: ReactNode
  initialStep: TransitionStep
}

interface ReducerData<TransitionStep> {
  currentStep: TransitionStep
  enterAnimation: TransitionAnimationDirection | undefined
  existAnimation: TransitionAnimationDirection | undefined
}

const GroupTransitionContext = createContext<GroupTransitionContextData<any>>(
  {} as GroupTransitionContextData<any>
)

export const useGroupTransitionContext = <TransitionStep,>() => {
  const context = useContext(GroupTransitionContext)
  if (!context) {
    throw new Error(
      'useGroupTransitionContext must be used within a GroupTransitionProvider'
    )
  }
  return context as GroupTransitionContextData<TransitionStep>
}

export const GroupTransitionProvider = <TransitionStep,>({
  children,
  initialStep,
}: GroupTransitionProviderProps<TransitionStep>) => {
  const groupReducerReducer = (
    state: ReducerData<TransitionStep>,
    action: {
      type: 'SET_CURRENT_STEP' | 'SET_ENTER_ANIMATION' | 'SET_EXIST_ANIMATION'
      payload: Partial<ReducerData<TransitionStep>>
    }
  ): ReducerData<TransitionStep> => {
    const { type, payload } = action
    switch (type) {
      case 'SET_CURRENT_STEP':
        return {
          ...state,
          currentStep: payload.currentStep!,
        }

      case 'SET_ENTER_ANIMATION':
        return {
          ...state,
          enterAnimation: payload.enterAnimation,
        }

      case 'SET_EXIST_ANIMATION':
        return {
          ...state,
          existAnimation: payload.existAnimation,
        }

      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(groupReducerReducer, {
    currentStep: initialStep,
    enterAnimation: undefined,
    existAnimation: undefined,
  })

  function handleSetCurrentStep(currentStep: TransitionStep) {
    dispatch({
      type: 'SET_CURRENT_STEP',
      payload: {
        currentStep,
      },
    })
  }

  function handleSetEnterAnimation(
    enterAnimation: TransitionAnimationDirection
  ) {
    dispatch({
      type: 'SET_ENTER_ANIMATION',
      payload: {
        enterAnimation,
      },
    })
  }

  function handleSetExistAnimation(
    existAnimation: TransitionAnimationDirection
  ) {
    dispatch({
      type: 'SET_EXIST_ANIMATION',
      payload: {
        existAnimation,
      },
    })
  }

  return (
    <GroupTransitionContext.Provider
      value={{
        ...state,
        handleSetCurrentStep,
        handleSetEnterAnimation,
        handleSetExistAnimation,
      }}
    >
      {children}
    </GroupTransitionContext.Provider>
  )
}
