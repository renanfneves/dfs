import { api } from "@/libs/axios";

export interface GetTopicsResponse {
  topics: Topic[]
}

export async function getTopicsApi() {
  try {
    const response = await api.get<GetTopicsResponse>('/topics');
    const { topics } = response.data;
    return topics;
  } catch (error) {
    console.error('Failed to get topics:', error)
    throw error
  }
}