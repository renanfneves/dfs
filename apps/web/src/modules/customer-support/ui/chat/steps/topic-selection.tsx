import { HTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { useChangeTransitionStep } from '@/components/ui/group-transition/hooks/useChangeTransitionStep'
import { useTranslation } from '@/libs/i18n'
import { cn } from '@/libs/tailwind/utils'
import { ChatForm } from '@/modules/customer-support/hooks/use-chat-form'
import { useTopics } from '@/modules/customer-support/hooks/use-topics'

export function TopicSelection({ className }: HTMLAttributes<HTMLDivElement>) {
  const { topics } = useTopics()
  const { setValue } = useFormContext<ChatForm>()
  const { t } = useTranslation('customer_support')

  const { navigateToNextComponent, navigateToPreviousComponent } =
    useChangeTransitionStep<ChatSteps>()

  function handleChooseTopic(topic: Topic) {
    setValue('topic', topic)
    navigateToNextComponent('subtopic-selection')
  }

  return (
    <section className={cn('space-y-4', className)}>
      <p>{t('steps.topic_selection.description')}</p>
      <ul className="space-y-2">
        {topics?.map((topic) => (
          <li key={topic.id}>
            <Button
              type="button"
              variant="box"
              onClick={() => handleChooseTopic(topic)}
            >
              {topic.category}
            </Button>
          </li>
        ))}
      </ul>
      <DialogFooter className="sm:justify-start">
        <Button
          type="button"
          variant="link"
          onClick={() => navigateToPreviousComponent('agent-greetings')}
        >
          {t('previous', { ns: 'common' })}
        </Button>
      </DialogFooter>
    </section>
  )
}
