import { ElementType, useCallback } from 'react'

import { cn } from '@/libs/tailwind/utils'

import { CSSTransitionWrapper } from './components/css-transition-wrapper'
import { useChangeTransitionStep } from './hooks/useChangeTransitionStep'

interface GroupTransitionProps<TransitionStep> {
  components: {
    Component: ElementType
    key: TransitionStep
  }[]
  initialStep: TransitionStep
}

export function GroupTransition<TransitionStep>({
  components,
}: GroupTransitionProps<TransitionStep>) {
  const { currentStep, enterAnimation, existAnimation } =
    useChangeTransitionStep()

  const setAnimationClass = useCallback(
    (key: TransitionStep) => {
      return (
        (currentStep === key ? enterAnimation : existAnimation)?.toString() ||
        ''
      )
    },
    [currentStep, enterAnimation, existAnimation]
  )

  return (
    <div className="relative w-full">
      {components.map(({ Component, key }) => {
        const animationClass = setAnimationClass(key)
        const componentClass = cn(
          'absolute left-0 top-0 w-[95%] transition-transform duration-500 ease-linear',
          animationClass
        )

        return (
          <CSSTransitionWrapper
            key={`${key}`}
            show={currentStep === key}
            className={animationClass}
          >
            <Component className={componentClass} />
          </CSSTransitionWrapper>
        )
      })}
    </div>
  )
}
