import { TDBMarketDrizzle } from './types';
import { users, carts } from '../schema';
import { faker } from '@faker-js/faker';
import { MarketRoles } from '@pkm/libs/entities';

export const seederUsers = async (db: TDBMarketDrizzle) => {
  try {
    console.log('Seeding... Users Market');

    await db.delete(users);

    const dummyUsers = [];

    for (let i = 0; i < 10; i++) {
      dummyUsers.push({
        fullname: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        address: faker.location.country(),
        roleId: MarketRoles.USER,
        emailVerifiedAt: new Date(),
        gender: faker.helpers.arrayElement(['male', 'female']),
        phoneNumber: faker.phone.number({ style: 'international' }),
      });
    }

    const result = await db.insert(users).values(dummyUsers).returning();

    const initialCarts = [];

    for (let i = 0; i < result.length; i++) {
      initialCarts.push({
        userId: result[i].id,
      });
    }

    await db.insert(carts).values(initialCarts).returning();

    console.log('Users Market has been seeded!\n');
  } catch (error) {
    console.error(error);
  }
};
