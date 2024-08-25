import { configEnv } from '@pkm/libs/env';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const pool = new Pool({
  // host: configEnv.DB_HOST,
  // port: Number(configEnv.DB_PORT),
  // user: configEnv.DB_USER,
  // password: configEnv.DB_PASSWORD,
  // database: configEnv.DB_NAME,
  // ssl: { rejectUnauthorized: false },
  connectionString: configEnv.DB_URL_POOLER,
});

export const db = drizzle(pool, { schema });
