import { roles } from '../schema';
import { TDBTourismDrizzle } from './types';

export const rolesSeeder = async (db: TDBTourismDrizzle) => {
  try {
    console.log('Seeding.... roles tourism');
    await db.delete(roles);

    await db
      .insert(roles)
      .values({
        name: 'admin',
      })
      .returning();
    console.log('Roles Tourism has been seeded!\n');
  } catch (error) {
    console.error(error);
  }
};
