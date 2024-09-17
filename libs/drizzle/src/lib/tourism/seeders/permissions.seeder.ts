import { permissions, rolePermissions } from '../schema';
import { TDBTourismDrizzle } from './types';

export const permissionsSeeder = async (db: TDBTourismDrizzle) => {
  try {
    console.log('Seeding... Permissions Tourism');

    await db.delete(permissions);

    const roles = await db.query.roles.findMany();

    const dummyPermissions = [];

    for (let i = 0; i < roles.length; i++) {
      dummyPermissions.push({
        name: roles[i].name,
      });
    }

    await db.insert(permissions).values(dummyPermissions).returning();

    const allPermissions = await db.query.permissions.findMany();
    console.log(allPermissions);

    const dummyRolePermissions = [];

    for (let i = 0; i < allPermissions.length; i++) {
      dummyRolePermissions.push({
        permissionId: allPermissions[i].id,
        roleId: roles[i].id,
      });
    }

    await db.insert(rolePermissions).values(dummyRolePermissions).returning();

    console.log('Permissions Tourism has been seeded!\n');
  } catch (error) {
    console.error(error);
  }
};
