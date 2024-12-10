import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  image: varchar(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  price: integer().notNull(),
  category: varchar().notNull(),
  description: varchar().notNull(),
  about: varchar(),
  imageUrl: varchar().notNull(),
  fileUrl: varchar().notNull(),
  message: varchar(),
  createdBy: varchar()
    .notNull()
    .references(() => usersTable.email),
});

export const cartTable = pgTable("cart", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar('email')
    .notNull()
    .references(() => usersTable.email),
  productId: integer("productId")
    .notNull()
    .references(() => productsTable.id),
});

export const OrderTable = pgTable("orders",{
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar('email')
  .notNull()
  .references(() => usersTable.email),
  productId: integer("productId")
    .notNull()
    .references(() => productsTable.id),
})