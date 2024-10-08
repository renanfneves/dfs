import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './src/libs/playwright/tests',
  testMatch: /.*\.e2e-spec\.ts$/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'http://localhost:9999',
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
  },
  webServer: {
    command: 'pnpm dev:test',
    port: 9999,
    reuseExistingServer: !process.env.CI,
  },
});
