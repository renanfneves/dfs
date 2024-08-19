export class ChatSession {
  constructor(
    readonly agent: string,
    readonly topicId: string,
    readonly subTopicId: string,
    readonly chosenSubject: string,
    readonly email: string,
  ) { }
}