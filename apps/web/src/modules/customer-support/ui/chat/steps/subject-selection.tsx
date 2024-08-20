import { HTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { useChangeTransitionStep } from '@/components/ui/group-transition/hooks/use-change-transition-step'
import { Trans, useTranslation } from '@/libs/i18n'
import { cn } from '@/libs/tailwind/utils'
import { ChatForm } from '@/modules/customer-support/hooks/use-chat-form'
import { useSubtopic } from '@/modules/customer-support/hooks/use-subtopic'

export function SubjectSelection({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  const { t } = useTranslation()
  const { setValue, watch } = useFormContext<ChatForm>()
  const topic = watch('topic')
  const subtopicId = watch('subTopicId')
  const { getById } = useSubtopic(topic)
  const chosenSubtopic = getById(subtopicId)
  const suggestions = chosenSubtopic?.suggestions || []

  const { navigateToPreviousComponent, navigateToNextComponent } =
    useChangeTransitionStep<ChatSteps>()

  function handleChooseSubject(subject: string) {
    setValue('chosenSubject', subject)
    navigateToNextComponent('choices-summary')
  }

  return (
    <section className={cn('space-y-4', className)}>
      <p>
        <Trans
          i18nKey="steps.subject_selection.description"
          components={{ strong: <strong /> }}
          ns="customer_support"
          values={{ subtopic: chosenSubtopic?.name }}
        />
      </p>
      <ul className="space-y-2">
        {suggestions.map((subject) => (
          <li key={subject.trim().replace(/\s+/g, '-')}>
            <Button
              type="button"
              variant="box"
              onClick={() => handleChooseSubject(subject)}
            >
              {subject}
            </Button>
          </li>
        ))}
      </ul>
      <DialogFooter className="sm:justify-start">
        <Button
          type="button"
          variant="link"
          onClick={() => navigateToPreviousComponent('subtopic-selection')}
        >
          {t('previous', { ns: 'common' })}
        </Button>
      </DialogFooter>
    </section>
  )
}
