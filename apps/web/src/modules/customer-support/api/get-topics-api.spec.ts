import { MOCKED_TOPICS } from "@/libs/msw/constants/topics"

import { getTopicsApi } from "./get-topics-api"

describe('getTopicsApi', () => {
  it('should get topics', async () => {
    const response = await getTopicsApi()

    expect(response).toEqual(MOCKED_TOPICS)
  })
})