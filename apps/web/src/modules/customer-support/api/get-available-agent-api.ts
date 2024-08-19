import { api } from "@/libs/axios";

export interface GetAvailableAgentResponse {
  agent: string
}

export async function getAvailableAgentApi() {
  try {
    const response = await api.get<GetAvailableAgentResponse>('/agents/available')

    const { agent } = response.data
    return agent
  } catch (error) {
    console.error('Failed to get agent:', error)
    throw error
  }
}