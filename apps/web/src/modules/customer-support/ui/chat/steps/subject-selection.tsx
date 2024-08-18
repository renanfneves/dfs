import { HTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { useChangeTransitionStep } from '@/components/ui/group-transition/hooks/useChangeTransitionStep'
import { ChatForm } from '@/modules/customer-support/hooks/use-chat-form'
import { useSuggestions } from '@/modules/customer-support/hooks/use-suggestions'

export function SubjectSelection({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  const { getByParentsIds } = useSuggestions()
  const { setValue, watch } = useFormContext<ChatForm>()

  const { navigateToPreviousComponent, navigateToNextComponent } =
    useChangeTransitionStep<ChatSteps>()

  const topicId = watch('topicId')
  const subtopicId = watch('subTopicId')
  const suggestions = getByParentsIds({ topicId, subtopicId })

  function setChosenSubject(subject: string) {
    setValue('chosenSubject', subject)
    navigateToNextComponent('choices-summary')
  }

  return (
    <section className={className}>
      <p>Escolha um assunto para finalizarmos</p>
      <ul>
        {suggestions.map((subject) => (
          <li key={subject.trim().replace(/\s+/g, '-')}>
            <button type="button" onClick={() => setChosenSubject(subject)}>
              {subject}
            </button>
          </li>
        ))}
      </ul>
      <Button
        type="button"
        onClick={() => navigateToPreviousComponent('subtopic-selection')}
      >
        previous
      </Button>
    </section>
  )
}
