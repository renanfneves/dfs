import { MOCKED_AVAILABLE_AGENTS } from "@/libs/msw/constants/agents"

import { getAvailableAgentApi } from "./get-available-agent-api"

describe('getAvailableAgentApi', () => {
  it('should get available agent', async () => {
    const response = await getAvailableAgentApi()

    expect(MOCKED_AVAILABLE_AGENTS).toContain(response)
  })
})