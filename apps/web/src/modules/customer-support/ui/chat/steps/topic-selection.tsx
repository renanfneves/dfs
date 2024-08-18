import { HTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { useChangeTransitionStep } from '@/components/ui/group-transition/hooks/useChangeTransitionStep'
import { ChatForm } from '@/modules/customer-support/hooks/use-chat-form'
import { useTopics } from '@/modules/customer-support/hooks/use-topics'

export function TopicSelection({ className }: HTMLAttributes<HTMLDivElement>) {
  const { topics } = useTopics()
  const { setValue } = useFormContext<ChatForm>()

  const { navigateToNextComponent, navigateToPreviousComponent } =
    useChangeTransitionStep<ChatSteps>()

  function setChosenTopic(topicId: string) {
    setValue('topicId', topicId)
    navigateToNextComponent('subtopic-selection')
  }

  return (
    <section className={className}>
      <p>Escolha um tópico para iniciarmos</p>
      <ul>
        {topics?.map((topic) => (
          <li key={topic.id}>
            <button type="button" onClick={() => setChosenTopic(topic.id)}>
              {topic.category}
            </button>
          </li>
        ))}
      </ul>
      <Button
        type="button"
        onClick={() => navigateToPreviousComponent('agent-greetings')}
      >
        previous
      </Button>
    </section>
  )
}
