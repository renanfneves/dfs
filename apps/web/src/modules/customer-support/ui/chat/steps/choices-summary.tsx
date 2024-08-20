import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { useChangeTransitionStep } from '@/components/ui/group-transition/hooks/use-change-transition-step'
import { Input } from '@/components/ui/input'
import { SummaryCard } from '@/components/ui/summary-card'
import { useTranslation } from '@/libs/i18n'
import { ChatForm } from '@/modules/customer-support/hooks/use-chat-form'
import { useSaveChatSession } from '@/modules/customer-support/hooks/use-save-chat-session'
import { useSubtopic } from '@/modules/customer-support/hooks/use-subtopic'

export function ChoicesSummary() {
  const { t } = useTranslation('customer_support')
  const { navigateToPreviousComponent } = useChangeTransitionStep<ChatSteps>()
  const { isPending } = useSaveChatSession()
  const { watch, register } = useFormContext<ChatForm>()
  const topic = watch('topic')
  const subtopicId = watch('subTopicId')
  const chosenSubject = watch('chosenSubject')
  const { getById } = useSubtopic(topic)
  const subtopic = getById(subtopicId)?.name ?? ''

  return (
    <section className="flex flex-col gap-y-4">
      <span>{t('steps.choices_summary.thanks_message')}</span>
      <span>{t('steps.choices_summary.choices')}</span>
      <div className="space-y-2 overflow-y-scroll">
        <SummaryCard title="Topic" value={topic?.category} />
        <SummaryCard title="Subtopic" value={subtopic} />
        <SummaryCard title="Subject" value={chosenSubject} />
      </div>
      <label htmlFor="email">{t('steps.choices_summary.ask_for_email')}</label>
      <Input
        {...register('email')}
        placeholder="johndoe@email.com"
        data-testid="email-input"
      />
      <DialogFooter>
        <Button
          type="button"
          variant="link"
          onClick={() => navigateToPreviousComponent('subject-selection')}
        >
          {t('previous', { ns: 'common' })}
        </Button>
        <Button type="submit" disabled={isPending} data-testid="submit-btn">
          {t('steps.choices_summary.submit')}
        </Button>
      </DialogFooter>
    </section>
  )
}
