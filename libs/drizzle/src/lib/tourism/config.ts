import { defineConfig } from 'drizzle-kit';

const configEnv = process.env;

export default defineConfig({
  dialect: 'postgresql',
  schema: 'libs/drizzle/src/lib/tourism/schema.ts',
  out: 'libs/drizzle/src/lib/tourism/migrations',
  dbCredentials: {
    url: String(configEnv.DB_URL),
  },
});
