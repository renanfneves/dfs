import { ChatSession } from "./dtos/chat-session"
import { saveChatSessionApi } from "./save-chat-session-api"


describe('saveChatSessionApi', () => {
  it('save chat session', async () => {
    const chatSession = new ChatSession(
      'agent', 'topicId', 'subTopicId', 'chosenSubject', 'email@email.com'
    )
    await expect(saveChatSessionApi(chatSession)).resolves.not.toThrow()
  })

  it('should rejects if api error', async () => {
    const chatSession = {} as ChatSession
    await expect(saveChatSessionApi(chatSession)).rejects.toThrowError()
  })
})