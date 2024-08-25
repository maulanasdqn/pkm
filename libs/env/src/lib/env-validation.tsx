/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
import { z, TypeOf } from 'zod';

const zodEnv = z.object({
  NEXT_PUBLIC_BASE_URL: z.string().url().min(1),
  NEXT_PUBLIC_GOOGLE_TAG_ID: z.string().min(1),
  AUTH_URL: z.string().url().min(1),
  AUTH_SECRET: z.string().min(1),
  AUTH_GOOGLE_CLIENT_ID: z.string().url().min(1),
  AUTH_GOOGLE_CLIENT_SECRET: z.string().min(1),
  DB_HOST: z.string().url().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_NAME: z.string().min(1),
  DB_PORT: z.string().min(1),
  DB_URL: z.string().url().min(1),
  DB_URL_POOLER: z.string().url().min(1),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends TypeOf<typeof zodEnv> {}
  }
}

try {
  zodEnv.parse(process.env);
} catch (err) {
  if (err instanceof z.ZodError) {
    const { fieldErrors } = err.flatten();
    const errorMessage = Object.entries(fieldErrors)
      .map(([field, errors]) =>
        errors ? `${field}: ${errors.join(', ')}` : field
      )
      .join('\n  ');
    throw new Error(`Missing environment variables:\n  ${errorMessage}`);
  }
}
