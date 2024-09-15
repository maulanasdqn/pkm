import { TDBMarketDrizzle } from './types';
import { category } from '../schema';

export const categorySeeder = async (db: TDBMarketDrizzle) => {
  try {
    console.log('Seeding... Categories Market');

    await db.delete(category);

    await db
      .insert(category)
      .values([
        {
          name: 'Pertanian',
        },
        {
          name: 'Perikanan',
        },
        {
          name: 'Peternakan',
        },
        {
          name: 'Perkebunan',
        },
        {
          name: 'Kerajinan',
        },
        {
          name: 'Kesehatan',
        },
      ])
      .returning();

    console.log('Categories Market has been seeded!\n');
  } catch (error) {
    console.error(error);
  }
};
