import { getAvailableAgentMock } from "./get-available-agent-mock";
import { getTopicsMock } from "./get-topics-mock";
import { saveChatSessionMock } from "./save-chat-session-mock";

export const mswHandlers = [getAvailableAgentMock, getTopicsMock, saveChatSessionMock]
