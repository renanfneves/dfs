import { ElementType, useCallback } from 'react'
import { TransitionGroup } from 'react-transition-group'

import { cn } from '@/libs/tailwind/utils'

import { CSSTransitionWrapper } from './components/css-transition-wrapper'
import { useChangeTransitionStep } from './hooks/use-change-transition-step'

interface GroupTransitionProps<TransitionStep> {
  components: {
    Component: ElementType
    key: TransitionStep
  }[]
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
    <TransitionGroup className="relative w-full overflow-hidden">
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
    </TransitionGroup>
  )
}
