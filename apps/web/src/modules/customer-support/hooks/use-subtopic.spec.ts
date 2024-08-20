import { renderHook } from "@testing-library/react"

import { useSubtopic } from "./use-subtopic"

const subcategories = [
  {
    id: '1',
    name: 'subtopic',
    suggestions: ['suggestion'],
  },
  {
    id: '2',
    name: 'subtopic',
    suggestions: ['suggestion'],
  }
]

const topic = {
  id: '1',
  category: 'category',
  subcategories
}

describe('useSubtopic', () => {
  it('should return subtopic by id', () => {
    const { result } = renderHook(() => useSubtopic(topic))

    const subtopic = result.current.getById('1')
    expect(subtopic).toMatchObject(subcategories[0])
  })
})