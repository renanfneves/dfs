import { authenticateMock } from "./authenticate-mock";
import { getTopicsMock } from "./get-topics-mock";

export const mswHandlers = [authenticateMock, getTopicsMock]
