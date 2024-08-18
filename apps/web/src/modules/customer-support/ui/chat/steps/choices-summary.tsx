import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { useChangeTransitionStep } from '@/components/ui/group-transition/hooks/useChangeTransitionStep'
import { ChatForm } from '@/modules/customer-support/hooks/use-chat-form'

export function ChoicesSummary() {
  const { navigateToPreviousComponent } = useChangeTransitionStep<ChatSteps>()
  const { getValues } = useFormContext<ChatForm>()

  const values = getValues()

  return (
    <section>
      <p>Let us confirm your choices</p>
      <p>Topic: {values.topicId}</p>
      <p>Subtopic: {values.subTopicId}</p>
      <p>Subject: {values.chosenSubject}</p>
      <p>Is this correct?</p>
      <Button
        type="button"
        onClick={() => navigateToPreviousComponent('subject-selection')}
      >
        previous
      </Button>
      <Button type="submit">save</Button>
    </section>
  )
}
