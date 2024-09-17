import { faker } from '@faker-js/faker';
import * as schema from '../schema';
import { TDBTourismDrizzle } from './types';

export const reservationsSeeder = async (db: TDBTourismDrizzle) => {
  try {
    const reservationsExists = await db
      .select({ id: schema.reservations.id })
      .from(schema.reservations);
    if (reservationsExists.length > 0) {
      return;
    }
    console.log('Seeding reservations... 🚀');

    const dummyDestinations = await db.query.destinations.findMany();
    const dummyReservations = [];

    for (let i = 0; i < 10; i++) {
      dummyReservations.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number({ style: 'international' }),
        date: faker.date.soon(),
        time: `${faker.number.int({ min: 0, max: 24 })}:${faker.number.int({
          min: 0,
          max: 59,
        })}`,
        quantity: faker.number.int(100),
        destinationId:
          dummyDestinations[faker.number.int({ min: 0, max: 9 })].id,
      });
    }

    await db.insert(schema.reservations).values(dummyReservations).returning();

    console.log('Seeding reservations done! 🎊');
  } catch (error) {
    console.error(error);
    console.log('Seeding reservations failed!');
  }
};
