import { faker } from '@faker-js/faker';
import * as schema from '../schema';
import { TDBTourismDrizzle } from './types';

export const reservationsSeeder = async (db: TDBTourismDrizzle) => {
  try {
    // const reservationsExists = await db
    //   .select({ id: schema.reservations.id })
    //   .from(schema.reservations);
    // if (reservationsExists.length > 0) {
    //   return;
    // }
    await db.delete(schema.reservations);
    console.log('Seeding reservations... 🚀');

    const dummyDestinations = await db.query.destinations.findMany();
    const dummyReservations = [];
    const dummyStatus = ['confirmed', 'reschedule', 'canceled'];

    for (let i = 0; i < 10; i++) {
      const dummyTime = `${faker.number.int({
        min: 0,
        max: 23,
      })}:${faker.number.int({
        min: 0,
        max: 59,
      })}`;
      const [hours, minutes] = dummyTime
        .split(':')
        .map((num) => num.padStart(2, '0'));

      const formattedTime = `${hours}:${minutes}`;
      dummyReservations.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number({ style: 'international' }),
        date: faker.date.soon(),
        time: formattedTime,
        quantity: faker.number.int(100),
        status: dummyStatus[faker.number.int({ min: 0, max: 2 })],
        destinationId:
          dummyDestinations[faker.number.int({ min: 0, max: 2 })].id,
      });
    }

    await db.insert(schema.reservations).values(dummyReservations).returning();

    console.log('Seeding reservations done! 🎊');
  } catch (error) {
    console.error(error);
    console.log('Seeding reservations failed!');
  }
};
