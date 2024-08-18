import { ChatForm } from "./use-chat-form"

export function useSaveChatChoices() {
  async function saveChatChoices(chatForm: ChatForm) {
    console.log(chatForm)
  }

  return {
    saveChatChoices,
  }
}