import { authenticateMock } from "./authenticate-mock";
import { getAvailableAgentMock } from "./get-available-agent-mock";
import { getTopicsMock } from "./get-topics-mock";
import { saveChatSessionMock } from "./save-chat-session-mock";

export const mswHandlers = [authenticateMock, getAvailableAgentMock, getTopicsMock, saveChatSessionMock]
