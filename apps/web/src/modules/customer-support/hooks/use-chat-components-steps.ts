import { AgentGreetings } from "../ui/chat/steps/agent-greetings"
import { ChoicesSummary } from "../ui/chat/steps/choices-summary"
import { SubjectSelection } from "../ui/chat/steps/subject-selection"
import { SubTopicSelection } from "../ui/chat/steps/subtopic-selection"
import { TopicSelection } from "../ui/chat/steps/topic-selection"

export function useChatComponentsSteps() {
  const componentsSteps: ComponentStep<ChatSteps>[] = [
    {
      key: 'agent-greetings',
      Component: AgentGreetings,
    },
    {
      key: 'topic-selection',
      Component: TopicSelection,
    },
    {
      key: 'subtopic-selection',
      Component: SubTopicSelection,
    },
    {
      key: 'subject-selection',
      Component: SubjectSelection,
    },
    {
      key: 'choices-summary',
      Component: ChoicesSummary,
    },
  ]

  return { componentsSteps }
}