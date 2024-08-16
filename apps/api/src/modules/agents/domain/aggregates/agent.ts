export class Agent {
  private constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}

  static restore(id: string, name: string) {
    return new Agent(id, name)
  }
}
