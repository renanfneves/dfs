import { randomUUID } from 'crypto'

import { EncryptedIp } from '../value-objects/encrypted-ip'

export class User {
  private constructor(
    public readonly id: string,
    public readonly encryptedIp: EncryptedIp,
  ) {}

  static create(ip: string) {
    const encryptedIp = new EncryptedIp(ip)

    return new User(randomUUID(), encryptedIp)
  }

  static restore(id: string, ip: string) {
    const encryptedIp = new EncryptedIp(ip)

    return new User(id, encryptedIp)
  }
}
