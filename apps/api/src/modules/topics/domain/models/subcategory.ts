export class Subcategory {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly suggestions: string[],
  ) { }
}
