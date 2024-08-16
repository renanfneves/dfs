export interface AgentsRepository {
  exists(id: string): Promise<boolean>
}
