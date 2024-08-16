import { Subcategory } from '../models/subcategory'

export class Topic {
  private constructor(
    public readonly id: string,
    public readonly category: string,
    public readonly subcategories: Subcategory[],
  ) {}

  static restore(id: string, category: string, subcategories: Subcategory[]) {
    return new Topic(id, category, subcategories)
  }
}
