import { expect, test } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page).toHaveTitle('Customer Support | Deutsche Fintech Solutions')
})

test('has chat button', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByRole('button', { name: 'Chat' })).toBeVisible()
})

test('open modal by clicking chat button', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Chat' }).click()

  await expect(page.getByText('Hello! I am')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Start Chat' })).toBeVisible()
})

test('start chat moves to root topic tree selection', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Chat' }).click()
  await page.getByRole('button', { name: 'Start Chat' }).click()

  await expect(page.getByRole('button', { name: 'Football' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Books' })).toBeVisible()
})

test('selecting root topic on tree moves to its subtopics', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Chat' }).click()
  await page.getByRole('button', { name: 'Start Chat' }).click()
  await page.getByRole('button', { name: 'Football' }).click()

  await expect(page.getByText('Now that you have selected the Football')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Premier League' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Serie A' })).toBeVisible()
})

test('selecting subtopic from topic on tree moves suggestions as final root level', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Chat' }).click()
  await page.getByRole('button', { name: 'Start Chat' }).click()
  await page.getByRole('button', { name: 'Football' }).click()
  await page.getByRole('button', { name: 'Premier League' }).click()

  await expect(page.getByText('Excellent! We are almost there. Please pick a subject withing the subtopic Premier League')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Liverpool' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Man. United' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Manchester City' })).toBeVisible()
})

test('selecting suggestion on last root tree show summary', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Chat' }).click()
  await page.getByRole('button', { name: 'Start Chat' }).click()
  await page.getByRole('button', { name: 'Football' }).click()
  await page.getByRole('button', { name: 'Premier League' }).click()
  await page.getByRole('button', { name: 'Liverpool' }).click()

  await expect(page.getByText('Football')).toBeVisible()
  await expect(page.getByText('Premier League')).toBeVisible()
  await expect(page.getByText('Liverpool')).toBeVisible()
})

test('filling email allows to save chat request', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Chat' }).click()
  await page.getByRole('button', { name: 'Start Chat' }).click()
  await page.getByRole('button', { name: 'Football' }).click()
  await page.getByRole('button', { name: 'Premier League' }).click()
  await page.getByRole('button', { name: 'Liverpool' }).click()

  page.getByPlaceholder('johndoe@email.com').fill('johndoe@email.com')
  await page.getByRole('button', { name: 'send chat request' }).click()
  await expect(page.getByText('Chat request saved successfully. Have a great day!', { exact: true })).toBeVisible()
})

test('toast message displays on saving chat request error', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Chat' }).click()
  await page.getByRole('button', { name: 'Start Chat' }).click()
  await page.getByRole('button', { name: 'Football' }).click()
  await page.getByRole('button', { name: 'Premier League' }).click()
  await page.getByRole('button', { name: 'Liverpool' }).click()

  page.getByPlaceholder('johndoe@email.com').fill('email-to-fail@test.com')
  await page.getByRole('button', { name: 'send chat request' }).click()
  await expect(page.getByText('An error occurred while saving chat request. Please try again later', { exact: true })).toBeVisible()
})

test('it is possible to change choices in any step before submitting', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Chat' }).click()
  await page.getByRole('button', { name: 'Start Chat' }).click()
  await page.getByRole('button', { name: 'Football' }).click()
  await page.getByRole('button', { name: 'Premier League' }).click()
  await page.getByRole('button', { name: 'Liverpool' }).click()

  page.getByRole('button', { name: 'previous' }).click()
  await expect(page.getByRole('button', { name: 'Liverpool' })).toBeVisible()
  page.getByRole('button', { name: 'Man. United' }).click()

  await expect(page.getByText('Football')).toBeVisible()
  await expect(page.getByText('Premier League')).toBeVisible()
  await expect(page.getByText('Man. United')).toBeVisible()

  await page.getByRole('button', { name: 'previous' }).click()
  await page.getByRole('button', { name: 'previous' }).click()

  await expect(page.getByRole('button', { name: 'Serie A' })).toBeVisible()
  page.getByRole('button', { name: 'Serie A' }).click()

  await expect(page.getByText('Man. United')).not.toBeVisible()
  await expect(page.getByText('Juventus')).toBeVisible()
  await expect(page.getByText('Inter')).toBeVisible()
  await expect(page.getByText('Milan')).toBeVisible()

  await expect(page.getByRole('button', { name: 'previous' })).toBeVisible()

  await page.getByRole('button', { name: 'previous' }).click()
  await page.getByRole('button', { name: 'previous' }).click()

  await expect(page.getByRole('button', { name: 'Books' })).toBeVisible()
  await page.getByRole('button', { name: 'Books' }).click()

  await expect(page.getByText('Children')).toBeVisible()
  await expect(page.getByText('Investment')).toBeVisible()
})