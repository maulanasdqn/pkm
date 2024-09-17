import { faker } from '@faker-js/faker';
import { TDBTourismDrizzle } from './types';
import * as schema from '../schema';

export const informationsSeeder = async (db: TDBTourismDrizzle) => {
  try {
    const informationExists = await db
      .select({ id: schema.informations.id })
      .from(schema.informations);
    if (informationExists.length > 0) {
      return;
    }
    console.log('Seeding informations... 🚀');

    const dummyInformations = [];

    for (let i = 0; i < 10; i++) {
      dummyInformations.push({
        title: faker.lorem.sentence({ min: 3, max: 5 }),
        description: faker.lorem.paragraphs(10, '</br>\n'),
        location: faker.location.city(),
        image: faker.image.url(),
      });
    }

    await db.insert(schema.informations).values(dummyInformations).returning();
    console.log('Seeding informations done! 🎊');
  } catch (error) {
    console.error(error);
    console.log('Seeding informations failed!');
  }
};
