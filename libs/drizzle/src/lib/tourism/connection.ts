import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const configEnv = process.env;

const pool = new Pool({
  connectionString: String(configEnv.DB_URL),
});

export const db = drizzle(pool, { schema });
