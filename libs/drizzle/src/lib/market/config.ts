import { defineConfig } from 'drizzle-kit';

const configEnv = process.env;

export default defineConfig({
  dialect: 'postgresql',
  schema: 'libs/drizzle/src/lib/market/schema.ts',
  out: 'libs/drizzle/src/lib/market/migrations',
  dbCredentials: {
    // host: String(configEnv.DB_HOST),
    // port: Number(configEnv.DB_PORT),
    // user: String(configEnv.DB_USER),
    // password: String(configEnv.DB_PASSWORD),
    // database: String(configEnv.DB_NAME),
    // ssl: { rejectUnauthorized: false },
    url: String(configEnv.DB_URL),
  },
});
