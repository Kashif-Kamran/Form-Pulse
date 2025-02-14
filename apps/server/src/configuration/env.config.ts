import { z } from 'zod';

//  === Validated Schema === //
export const configSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z
    .string()
    .min(10, 'JWT secret must be at least 10 characters long'),
  JWT_EXPIRES_IN: z.string(),
  PORT: z.coerce.number(),
  NODE_ENV: z.enum(['development', 'production', 'test']),
});

export type ConfigSchema = z.infer<typeof configSchema>;

export function validateConfig(config: Record<string, unknown>): ConfigSchema {
  const parsed = configSchema.safeParse(config);
  if (!parsed.success) {
    console.error('❌ Invalid Environment Variables :', parsed.error.format());
    throw new Error('Invalid environment configuration');
  }
  return parsed.data;
}

export default () => {
  return validateConfig(process.env);
};
