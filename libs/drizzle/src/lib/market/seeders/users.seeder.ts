import { TDBMarketDrizzle } from './types';
import { users } from '../schema';
import { faker } from '@faker-js/faker';

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
        roleId: 2,
        emailVerifiedAt: new Date(),
        gender: faker.helpers.arrayElement(['male', 'female']),
        phoneNumber: faker.phone.number({ style: 'international' }),
      });
    }

    await db.insert(users).values(dummyUsers).returning();

    console.log('Users Market has been seeded!\n');
  } catch (error) {
    console.error(error);
  }
};
