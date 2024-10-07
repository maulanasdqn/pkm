import { relations } from 'drizzle-orm';
import {
  timestamp,
  pgTable,
  text,
  uuid,
  varchar,
  integer,
} from 'drizzle-orm/pg-core';

export const defaultImage =
  'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png';

/*
 * User
 */
export const users = pgTable('app_users', {
  id: uuid('id').defaultRandom().primaryKey(),
  otp: varchar('otp'),
  otpExp: timestamp('otp_expired', { mode: 'date' }),
  email: varchar('email').notNull().unique(),
  image: text('image').default(defaultImage),
  roleId: uuid('role_id').references(() => roles.id, { onDelete: 'cascade' }),
  address: text('address').notNull(),
  fullname: varchar('fullname').notNull(),
  password: varchar('password').notNull(),
  emailVerifiedAt: timestamp('email_verified_at', { mode: 'date' }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export const userRelations = relations(users, ({ one }) => ({
  roles: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
}));

/*
 * Role
 */
export const roles = pgTable('app_roles', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_At', { mode: 'date' }).defaultNow(),
});

export const roleRelations = relations(roles, ({ many }) => ({
  users: many(users),
  rolePermissions: many(rolePermissions),
}));

// infer Role type with relations
export type Role = typeof roles.$inferSelect;

/*
 * Permission
 */
export const permissions = pgTable('app_permissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export const permissionRelations = relations(permissions, ({ many }) => ({
  roles: many(rolePermissions),
}));

export type Permission = typeof permissions.$inferSelect;

/*
 * Role Permission
 */
export const rolePermissions = pgTable('app_role_permissions', {
  roleId: uuid('role_id').references(() => roles.id, { onDelete: 'cascade' }),
  permissionId: uuid('permission_id').references(() => permissions.id, {
    onDelete: 'cascade',
  }),
});

export const rolePermissionRelations = relations(
  rolePermissions,
  ({ one }) => ({
    role: one(roles, {
      fields: [rolePermissions.roleId],
      references: [roles.id],
    }),
    permission: one(permissions, {
      fields: [rolePermissions.permissionId],
      references: [permissions.id],
    }),
  })
);

export type RolePermission = typeof rolePermissions.$inferSelect;

/*
 * Destinations
 */
export const destinations = pgTable('app_destinations', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name').notNull(),
  description: varchar('description').notNull(),
  images: text('images').array().notNull(),
  ticketPrice: integer('ticket_price').notNull(),
  status: varchar('status').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export const destinationRelations = relations(destinations, ({ many }) => ({
  reservations: many(reservations),
}));

export type Destinations = typeof destinations.$inferSelect;

/*
 * Reservations
 */
export const reservations = pgTable('app_reservations', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull(),
  phoneNumber: varchar('phone_number').notNull(),
  date: timestamp('date', { mode: 'date' }).notNull(),
  time: text('time').notNull(),
  quantity: integer('quantity').notNull(),
  status: varchar('status').notNull(),
  total: integer('total').notNull(),
  destinationId: uuid('destination_id').references(() => destinations.id, {
    onDelete: 'cascade',
  }),
});

export type Reservations = typeof reservations.$inferSelect;

export const reservationsRelations = relations(reservations, ({ one }) => ({
  category: one(destinations, {
    fields: [reservations.destinationId],
    references: [destinations.id],
  }),
}));

/*
 * informations
 */
export const informations = pgTable('app_informations', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title').notNull(),
  location: varchar('location').notNull(),
  image: text('image').notNull(),
  description: varchar('description').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export type Informations = typeof informations.$inferSelect;
