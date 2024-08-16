import { EncryptedIp } from './encrypted-ip'

const TEST_IP = '192.168.0.1'

describe('EncryptedIp', () => {
  it('should always encrypt ip with the same value', async () => {
    const expectedResult = new EncryptedIp(TEST_IP)

    const encryptedIp = new EncryptedIp(TEST_IP)

    expect(encryptedIp.equals(expectedResult.value)).toBeTruthy()
  })

  it('should not be equal to another encrypted ip', async () => {
    const encryptedIp = new EncryptedIp(TEST_IP)
    const anotherEncryptedIp = new EncryptedIp('192.168.0.2')

    expect(encryptedIp.equals(anotherEncryptedIp.value)).toBeFalsy()
  })

  it('should throw an error if ip is not provided', async () => {
    expect(() => new EncryptedIp('')).toThrowError('IP is required')
  })
})
