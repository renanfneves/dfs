import crypto from 'node:crypto'

import { env } from '@/env'

export class EncryptedIp {
  value: string

  constructor(ip: string) {
    if (!ip) {
      throw new Error('IP is required')
    }

    this.value = this.encrypt(ip)
  }

  encrypt(ip: string) {
    const secretKey = Buffer.from(env.SECRET_KEY, 'hex')
    const cipher = crypto.createCipheriv('aes-256-ecb', secretKey, null)
    let encrypted = cipher.update(ip, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return encrypted
  }

  equals(value: string) {
    return this.value === value
  }
}
