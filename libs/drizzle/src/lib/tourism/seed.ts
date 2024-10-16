import { Pool } from 'pg';
import { destinationsSeeder } from './seeders/destinations.seeder';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { informationsSeeder } from './seeders/informations.seeder';
import { reservationsSeeder } from './seeders/reservations.seeder';
import { permissionsSeeder } from './seeders/permissions.seeder';
import { usersSeeder } from './seeders/users.seeder';
import { rolesSeeder } from './seeders/roles.seeder';

const configEnv = process.env;

const dbQueryClient = new Pool({
  connectionString: configEnv.DB_URL,
});

const db = drizzle(dbQueryClient, {
  schema,
});

const seeds = async () => {
  try {
    await destinationsSeeder(db);
    await informationsSeeder(db);
    await reservationsSeeder(db);
    await permissionsSeeder(db);
    await usersSeeder(db);
    await rolesSeeder(db);
  } catch (error) {
    console.error(error);
  }
};
seeds()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    console.log('\nSeeding Done!');
    process.exit(0);
  });
