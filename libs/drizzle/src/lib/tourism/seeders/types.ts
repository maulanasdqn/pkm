import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../schema';

export type TDBTourismDrizzle = NodePgDatabase<typeof schema>;
