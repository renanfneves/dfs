export interface UsersRepository {
  exists(id: string): Promise<boolean>
}
