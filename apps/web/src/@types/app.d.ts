type ChatSteps =
  | 'agent-greetings'
  | 'topic-selection'
  | 'subtopic-selection'
  | 'subject-selection'
  | 'choices-summary'

type Session = {
  isAuthenticated: boolean
  sub: string | undefined
}

type ComponentStep<T> = {
  key: T
  Component: ElementType
}

type SubTopic = {
  id: string,
  name: string,
  suggestions: string[]
}

type Topic = {
  id: string
  category: string
  subcategories: SubTopic[]
}

