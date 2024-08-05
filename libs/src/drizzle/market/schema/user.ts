import { timestamp, pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('app_user', {
  id: uuid('id').defaultRandom().primaryKey(),
  fullname: text('fullname'),
  email: text('email').unique(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  avatar: text('avatar'),
  password: text('password').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }),
  updatedAt: timestamp('updated_at', { mode: 'date' }),
});
