import { HTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { useChangeTransitionStep } from '@/components/ui/group-transition/hooks/use-change-transition-step'
import { Trans, useTranslation } from '@/libs/i18n'
import { cn } from '@/libs/tailwind/utils'
import { ChatForm } from '@/modules/customer-support/hooks/use-chat-form'

export function SubTopicSelection({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  const { t } = useTranslation()
  const { setValue, watch } = useFormContext<ChatForm>()
  const chosenTopic = watch('topic')

  const { navigateToNextComponent, navigateToPreviousComponent } =
    useChangeTransitionStep<ChatSteps>()

  function setChosenSubTopic(subTopicId: string) {
    setValue('subTopicId', subTopicId)
    navigateToNextComponent('subject-selection')
  }

  return (
    <section className={cn('space-y-4', className)}>
      <p>
        <Trans
          i18nKey="steps.subtopic_selection.description"
          components={{ strong: <strong /> }}
          ns="customer_support"
          values={{ topic: chosenTopic.category }}
        />
      </p>
      <ul className="space-y-2">
        {chosenTopic?.subcategories.map((subcategory) => (
          <li key={subcategory.id}>
            <Button
              type="button"
              variant="box"
              onClick={() => setChosenSubTopic(subcategory.id)}
            >
              {subcategory.name}
            </Button>
          </li>
        ))}
      </ul>
      <DialogFooter className="sm:justify-start">
        <Button
          type="button"
          variant="link"
          onClick={() => navigateToPreviousComponent('topic-selection')}
        >
          {t('previous')}
        </Button>
      </DialogFooter>
    </section>
  )
}
