
export function useSubtopic(topic: Topic) {

  function getById(subtopicId: string) {
    return topic.subcategories.find((subcategory) => subcategory.id === subtopicId) ?? null
  }

  return {
    getById,
  }
}