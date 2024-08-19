import { useMutation } from "@tanstack/react-query"

import { ChatSession } from "../api/dtos/chat-session"
import { saveChatSessionApi } from "../api/save-chat-session-api"
import { ChatForm } from "./use-chat-form"

export function useSaveChatSession() {
  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: saveChatSessionApi
  })

  async function saveChatChoices({ agent, topic, subTopicId, chosenSubject, email }: ChatForm) {
    const data = new ChatSession(agent, topic.id, subTopicId, chosenSubject, email)
    await mutateAsync(data)
  }

  return {
    saveChatChoices,
    isPending,
    isSuccess,
    isError
  }
}