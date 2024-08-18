export function useUserIp() {
  function getUserIp() {
    // Fake IP address - Normally this would be fetched from the client using a service like ipify
    return { ip: '192.168.0.1' }
  }

  return {
    getUserIp
  }
}