import { Pool } from 'pg';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import { rolesSeeder } from './seeders/roles.seeder';
import { seederUsers } from './seeders/users.seeder';
import { categorySeeder } from './seeders/category.seeder';
import { productsSeeder } from './seeders/products.seeder';
import { permissionSeeder } from './seeders/permission.seeder';

const dbUrl = process.env.DB_URL as string;
const dbQueryClient = new Pool({
  connectionString: dbUrl,
});

const db = drizzle(dbQueryClient, {
  schema,
});

const seeds = async () => {
  try {
    await rolesSeeder(db);
    await permissionSeeder(db);
    await seederUsers(db);
    await categorySeeder(db);
    await productsSeeder(db);
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
