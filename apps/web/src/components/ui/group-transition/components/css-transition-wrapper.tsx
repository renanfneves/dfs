import { createRef, HTMLAttributes } from 'react'
import { CSSTransition } from 'react-transition-group'

interface CSSTransitionWrapperProps extends HTMLAttributes<HTMLDivElement> {
  show: boolean
  className: string
}

export function CSSTransitionWrapper({
  show,
  className,
  children,
}: CSSTransitionWrapperProps) {
  const nodeRef = createRef<HTMLDivElement>()
  return (
    <CSSTransition
      in={show}
      className={className}
      timeout={500}
      unmountOnExit
      nodeRef={nodeRef}
    >
      {children}
    </CSSTransition>
  )
}
