import '@testing-library/jest-dom/vitest'

import * as matchers from '@testing-library/jest-dom/matchers'

import { server } from './server'

expect.extend(matchers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())
