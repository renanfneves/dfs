export class SubTopic {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly suggestions: string[],
  ) {}
}
