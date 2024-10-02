import { faker } from '@faker-js/faker';
import { users } from '../schema';
import { TDBTourismDrizzle } from './types';

export const usersSeeder = async (db: TDBTourismDrizzle) => {
  try {
    console.log('Seeding... Users Tourism');
    const existUser = await db.select({ id: users.id }).from(users);
    if (existUser.length > 0) {
      return;
    }

    const dummyUsers = [];
    const dummyRoles = await db.query.roles.findFirst();

    for (let i = 0; i < 10; i++) {
      dummyUsers.push({
        fullname: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        address: faker.location.country(),
        role: dummyRoles?.id,
        emailVerifiedAt: new Date(),
      });
    }

    await db.insert(users).values(dummyUsers).returning();

    console.log('Users Tourism has been seeded!\n');
  } catch (error) {
    console.error(error);
  }
};
