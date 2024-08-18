import { useTopics } from './use-topics'

interface GetByParentsIdsParams {
  topicId: string
  subtopicId: string
}

export function useSuggestions() {
  const { topics, isFetching } = useTopics()

  function getByParentsIds({ topicId, subtopicId }: GetByParentsIdsParams) {
    if (isFetching || !topics) return []
    const topic = topics.find((topic) => topic.id === topicId)
    if (!topic) return []

    const subtopic = topic.subcategories.find((subcategory) => subcategory.id === subtopicId)
    if (!subtopic) return []

    return subtopic.suggestions
  }

  return {
    getByParentsIds,
  }
}