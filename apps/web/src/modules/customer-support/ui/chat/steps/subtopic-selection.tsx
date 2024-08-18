import { HTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { useChangeTransitionStep } from '@/components/ui/group-transition/hooks/useChangeTransitionStep'
import { ChatForm } from '@/modules/customer-support/hooks/use-chat-form'
import { useTopic } from '@/modules/customer-support/hooks/use-topic'

export function SubTopicSelection({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  const { getTopicById } = useTopic()
  const { setValue, watch } = useFormContext<ChatForm>()

  const { navigateToNextComponent, navigateToPreviousComponent } =
    useChangeTransitionStep<ChatSteps>()

  const topicId = watch('topicId')
  const chosenTopic = getTopicById(topicId)

  function setChosenSubTopic(subTopicId: string) {
    setValue('subTopicId', subTopicId)
    navigateToNextComponent('subject-selection')
  }

  return (
    <section className={className}>
      <p>
        Agora que você escolheu o topic {chosenTopic?.category}, vamos escolher
        um sub tópico
      </p>
      <ul>
        {chosenTopic?.subcategories.map((subcategory) => (
          <li key={subcategory.id}>
            <button
              type="button"
              onClick={() => setChosenSubTopic(subcategory.id)}
            >
              {subcategory.name}
            </button>
          </li>
        ))}
      </ul>
      <Button
        type="button"
        onClick={() => navigateToPreviousComponent('topic-selection')}
      >
        previous
      </Button>
    </section>
  )
}
