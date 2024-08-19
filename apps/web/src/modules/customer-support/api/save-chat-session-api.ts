import { api } from "@/libs/axios"

import { ChatSession } from "./dtos/chat-session"

export async function saveChatSessionApi(choices: ChatSession) {
  try {
    await api.post('/chat-sessions', {
      ...choices
    })

  } catch (error) {
    console.error('Failed to get topics:', error)
    throw error
  }
}