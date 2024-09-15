import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../schema';

export type TDBMarketDrizzle = NodePgDatabase<typeof schema>;
