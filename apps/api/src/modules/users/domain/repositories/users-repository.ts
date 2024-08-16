import { User } from '../aggregates/user'
import { EncryptedIp } from '../value-objects/encrypted-ip'

export interface UsersRepository {
  getUserByIp(encryptedIp: EncryptedIp): Promise<User | null>
  createUser(encryptedIp: EncryptedIp): Promise<User>
}
