import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  PORT: z.number().default(3000),
  DATABASE_URL: z.string().url(),
  SECRET_KEY: z.string(),
  JWT_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables on api', _env.error.format())

  throw new Error('Invalid environment variables on api')
}

export const env = _env.data
