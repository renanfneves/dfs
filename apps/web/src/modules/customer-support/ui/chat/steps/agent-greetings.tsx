import { HTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { useChangeTransitionStep } from '@/components/ui/group-transition/hooks/useChangeTransitionStep'
import { ChatForm } from '@/modules/customer-support/hooks/use-chat-form'

export function AgentGreetings({ className }: HTMLAttributes<HTMLDivElement>) {
  const { navigateToNextComponent } = useChangeTransitionStep<ChatSteps>()
  const { setValue } = useFormContext<ChatForm>()

  setValue('agent', 'agent')

  return (
    <section className={className}>
      <p>Olá sou o agent e darei continuidade ao seu atendimento</p>
      <p>Vamos começar?</p>
      <Button
        type="button"
        onClick={() => navigateToNextComponent('topic-selection')}
      >
        next
      </Button>
    </section>
  )
}
