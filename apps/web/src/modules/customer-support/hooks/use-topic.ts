import { useTopics } from './use-topics'

export function useTopic() {
  const { topics, isFetching } = useTopics()

  function getTopicById(topicId: string) {
    if (isFetching || !topics) return null

    return topics.find((topic) => topic.id === topicId) ?? null
  }

  return {
    getTopicById,
  }
}