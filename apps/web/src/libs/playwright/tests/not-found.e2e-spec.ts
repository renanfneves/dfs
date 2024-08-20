import { expect, test } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/any-invalid-route', { waitUntil: 'networkidle' })

  await expect(page).toHaveTitle('404 | Deutsche Fintech Solutions')
})