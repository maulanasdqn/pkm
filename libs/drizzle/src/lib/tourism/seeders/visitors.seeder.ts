import { faker } from '@faker-js/faker';
import { TDBTourismDrizzle } from './types';
import { visitors } from '../schema';

type VisitorData = {
  date: string;
  mobile: number;
  desktop: number;
};

export const visitorsSeeder = async (db: TDBTourismDrizzle) => {
  try {
    console.log('Seeding.... visitor tourism');
    await db.delete(visitors);

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const data: VisitorData[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day, 23, 59, 59, 586);
      // Dummy data for each day, adjust as needed
      const desktopVisitors = faker.number.int({ min: 5, max: 25 });
      const mobileVisitors = faker.number.int({ min: 3, max: 18 });

      data.push({
        date: date.toISOString().split('T')[0],
        desktop: desktopVisitors,
        mobile: mobileVisitors,
      });
    }
    console.log(data);
    await db.insert(visitors).values(data);
    const allVisitors = await db.query.visitors.findMany();
    console.log(allVisitors);
    console.log('Visitors Tourism has been seeded!\n');
  } catch (error) {
    console.error(error);
  }
};
