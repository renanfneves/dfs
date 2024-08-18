import { z } from 'zod'

const envSchema = z.object({
  VITE_API_BASE_URL: z.string(),
  MODE: z.enum(['production', 'development', 'CI']),
})

const _env = envSchema.safeParse(import.meta.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables on web', _env.error.format())

  throw new Error('Invalid environment variables on web')
}

export const env = _env.data
