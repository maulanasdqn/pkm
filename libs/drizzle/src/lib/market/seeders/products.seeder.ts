import { TDBMarketDrizzle } from './types';
import { products } from '../schema';
import { faker } from '@faker-js/faker';

export const productsSeeder = async (db: TDBMarketDrizzle) => {
  try {
    console.log('Seeding... Products Market');

    await db.delete(products);

    const dummyCategories = await db.query.category.findMany();

    const dummyProducts = [];
    for (let i = 0; i < 30; i++) {
      dummyProducts.push({
        name: faker.food.dish(),
        description: faker.food.description(),
        price: faker.number.int({ min: 5000, max: 20000 }),
        image: faker.image.url(),
        stock: faker.number.int({ min: 10, max: 100 }),
        sold: 0,
        categoryId: dummyCategories[faker.number.int({ min: 0, max: 5 })].id,
      });
    }

    await db.insert(products).values(dummyProducts).returning();

    console.log('Products Market has been seeded!\n');
  } catch (error) {
    console.error(error);
  }
};
