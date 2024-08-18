import { useCallback } from "react"

import { useGroupTransitionContext } from "../context/group-transition-context";

export function useChangeTransitionStep<TransitionStep>() {


  const {
    currentStep,
    enterAnimation,
    existAnimation,
    handleSetCurrentStep,
    handleSetEnterAnimation,
    handleSetExistAnimation,
  } = useGroupTransitionContext<TransitionStep>();

  const navigateToPreviousComponent = useCallback((componentKey: TransitionStep) => {
    handleSetEnterAnimation('animate-from-left-to-current')
    handleSetExistAnimation('animate-from-current-to-right')
    handleSetCurrentStep(componentKey)
  }, [handleSetCurrentStep, handleSetEnterAnimation, handleSetExistAnimation])

  const navigateToNextComponent = useCallback((componentKey: TransitionStep) => {
    handleSetEnterAnimation('animate-from-right-to-current')
    handleSetExistAnimation('animate-from-current-to-left')
    handleSetCurrentStep(componentKey)
  }, [handleSetCurrentStep, handleSetEnterAnimation, handleSetExistAnimation])

  return {
    currentStep,
    enterAnimation,
    existAnimation,
    navigateToPreviousComponent,
    navigateToNextComponent,
  }
}