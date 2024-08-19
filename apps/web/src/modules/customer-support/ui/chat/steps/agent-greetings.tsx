import { HTMLAttributes, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { useChangeTransitionStep } from '@/components/ui/group-transition/hooks/useChangeTransitionStep'
import { useTranslation } from '@/libs/i18n'
import { cn } from '@/libs/tailwind/utils'
import { useAvailableAgent } from '@/modules/customer-support/hooks/use-available-agent'
import { ChatForm } from '@/modules/customer-support/hooks/use-chat-form'

export function AgentGreetings({ className }: HTMLAttributes<HTMLDivElement>) {
  const { agent } = useAvailableAgent()
  const { navigateToNextComponent } = useChangeTransitionStep<ChatSteps>()
  const { setValue } = useFormContext<ChatForm>()
  const { t } = useTranslation('customer_support')

  useEffect(() => {
    if (agent) {
      setValue('agent', agent)
    }
  }, [agent, setValue])

  return (
    <section className={cn('space-y-4', className)}>
      <p>{t('steps.agent_greetings.welcome', { agent })}</p>
      <DialogFooter className="items-center sm:justify-between">
        <p>{t('steps.agent_greetings.description')}</p>
        <Button
          type="button"
          onClick={() => navigateToNextComponent('topic-selection')}
        >
          {t('steps.agent_greetings.start_chat')}
        </Button>
      </DialogFooter>
    </section>
  )
}
