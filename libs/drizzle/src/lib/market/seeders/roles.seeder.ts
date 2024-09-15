import { TDBMarketDrizzle } from './types';
import { roles } from '../schema';

export const rolesSeeder = async (db: TDBMarketDrizzle) => {
  try {
    console.log('Seeding... Roles Market');
    await db.delete(roles);

    await db
      .insert(roles)
      .values([
        {
          id: 1,
          name: 'ADMIN',
        },
        {
          id: 2,
          name: 'USER',
        },
      ])
      .returning();
    console.log('Roles Market has been seeded!\n');
  } catch (error) {
    console.error(error);
  }
};
