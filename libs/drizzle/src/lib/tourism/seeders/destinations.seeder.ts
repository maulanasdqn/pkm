import { faker } from '@faker-js/faker';
import * as schema from '../schema';
import { TDBTourismDrizzle } from './types';

export const destinationsSeeder = async (db: TDBTourismDrizzle) => {
  try {
    const existsDestinations = await db
      .select({ id: schema.destinations.id })
      .from(schema.destinations);
    if (existsDestinations.length > 0) {
      return;
    }
    console.log('Seeding destinations... 🚀');

    const dummyImages = [];
    for (let i = 0; i < 4; i++) {
      const fakerImage = faker.image.url();
      dummyImages.push(fakerImage);
    }

    const dummyDestinations = [];

    for (let i = 0; i < 10; i++) {
      dummyDestinations.push({
        name: faker.location.city(),
        description: faker.lorem.paragraphs(5, '</br>\n'),
        images: dummyImages,
        status: 'active',
        ticketPrice: faker.number.int({ min: 5000, max: 20000 }),
      });
    }

    await db.insert(schema.destinations).values(dummyDestinations).returning();

    console.log('Seeding destinations done! 🎊');
  } catch (error) {
    console.error('Error seeding destinations:', error);
  }
};
