import { relations } from 'drizzle-orm';
import {
  timestamp,
  pgTable,
  text,
  uuid,
  varchar,
  integer,
  pgEnum,
} from 'drizzle-orm/pg-core';

export const defaultImage =
  'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png';

export const genderEnum = pgEnum('gender', ['male', 'female']);

/*
 * User
 */
export const users = pgTable('app_users', {
  id: uuid('id').defaultRandom().primaryKey(),
  otp: varchar('otp'),
  email: varchar('email').notNull().unique(),
  image: text('image').default(defaultImage),
  roleId: integer('role_id')
    .references(() => roles.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  address: text('address').notNull(),
  fullname: varchar('fullname').notNull(),
  password: varchar('password').notNull(),
  gender: genderEnum('gender'),
  phoneNumber: varchar('phone_number', { length: 13 }),
  emailVerifiedAt: timestamp('email_verified_at', { mode: 'date' }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export const userRelations = relations(users, ({ one }) => ({
  roles: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
  carts: one(carts, {
    fields: [users.id],
    references: [carts.userId],
  }),
}));

export type Users = typeof users.$inferSelect;

/*
 * Role
 */
export const roles = pgTable('app_roles', {
  id: integer('id').primaryKey().notNull(),
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
  roleId: integer('role_id').references(() => roles.id, {
    onDelete: 'cascade',
  }),
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
 * Categories (Products)
 */

export const category = pgTable('app_categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export const categoryRelations = relations(category, ({ many }) => ({
  products: many(products),
}));

export type Category = typeof category.$inferSelect;

/*
 * Products
 */

export const products = pgTable('app_products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name').notNull(),
  description: text('description').notNull(),
  image: text('image').notNull(),
  price: integer('price').notNull(),
  stock: integer('stocks').notNull(),
  sold: integer('sold'),
  categoryId: uuid('category_id').references(() => category.id, {
    onDelete: 'cascade',
  }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export const productRelations = relations(products, ({ one, many }) => ({
  category: one(category, {
    fields: [products.categoryId],
    references: [category.id],
  }),
}));

export type Products = typeof products.$inferSelect;

/*
 * Carts
 */

export const cartItems = pgTable('app_cart_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  cartId: uuid('cart_id').references(() => carts.id, {
    onDelete: 'cascade',
  }),
  productId: uuid('product_id').references(() => products.id, {
    onDelete: 'cascade',
  }),
  quantity: integer('quantity').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export const cartItemRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, {
    fields: [cartItems.cartId],
    references: [carts.id],
  }),
  product: one(products, {
    fields: [cartItems.productId],
    references: [products.id],
  }),
}));

export const carts = pgTable('app_carts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  status: varchar('status').notNull(),
  totalPrice: integer('total_price'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export const cartRelations = relations(carts, ({ one, many }) => ({
  user: one(users, {
    fields: [carts.userId],
    references: [users.id],
  }),
  cartItems: many(cartItems),
}));

export type Carts = typeof carts.$inferSelect;
