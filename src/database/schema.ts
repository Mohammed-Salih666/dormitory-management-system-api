import { relations } from "drizzle-orm";
import { boolean, int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable('users',{ 
  id: int('id').primaryKey().autoincrement(), 
  name: varchar('name', { length: 255 }).notNull(),
  uni_id: varchar('uni_id', {length: 255}).unique().notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  image: varchar('image', { length: 255 }).notNull(),
  role: varchar('role', { length: 255 }).notNull().default('student'),
  gender: boolean('gender').notNull().default(true), //true = male, false = female
  has_deposit: boolean('has_deposit').notNull().default(false),
  access_token: varchar('access_token', { length: 255 }),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
  deleted_at: timestamp('deleted_at'),
}); 

export const usersRelations = relations(users, ({one}) => ({
  reservation: one(reservations, {
    fields: [users.id],
    references: [reservations.user_id],
  })
}))

export const apartments = mysqlTable('apartments', {
  id: int('id').primaryKey().autoincrement(),
  floor: varchar('floor', { length: 2 }).notNull(),
  number: int('number').notNull(),
  for_male: boolean(`for_male`).notNull().default(true),
  apartment_type: varchar('apartment_type', { length: 255 }).notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
  deleted_at: timestamp('deleted_at'),
}); 

export const apartmentsRelations = relations(apartments, ({many}) => ({
  rooms: many(rooms),
}))

export const rooms = mysqlTable('rooms', {
  id: int('id').primaryKey().autoincrement(), 
  apartment_id: int('apartment_id')
    .references(() => apartments.id)
    .notNull(), 
  room_number: varchar('room_number', { length: 3 }).notNull(),
  is_available: boolean('is_available').notNull().default(true),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
  deleted_at: timestamp('deleted_at'),
});

export const roomsRelations = relations(rooms, ({one}) => ({
  apartment: one(apartments, {
    fields: [rooms.apartment_id],
    references: [apartments.id],
  }),
})); 

export const reservations = mysqlTable('reservations', {
  id: int('id').primaryKey().autoincrement(), 
  user_id: int('user_id')
    .references(() => users.id)
    .notNull(), 
  room_id: int('room_id')
    .references(() => rooms.id)
    .notNull(), 
  status: varchar('status', { length: 255 }).notNull().default('pending'),
  semester: varchar('semester', { length: 255 }).notNull(),
  year: varchar('year', { length: 4 }).notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
  deleted_at: timestamp('deleted_at'),
}); 

export const reservationsRelations = relations(reservations, ({many}) => ({
  user: many(users),
  room: many(rooms),
})); 

export const inspections = mysqlTable('inspections', {
  id: int('id').primaryKey().autoincrement(),
  reservation_id: int('reservation_id')
    .references(() => reservations.id)
    .notNull(), 
  inspection_date: timestamp('inspection_date').notNull(),
  status: varchar('status', { length: 255 }).notNull().default('pending'),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
  deleted_at: timestamp('deleted_at')
}); 

export const inspectionsRelations = relations(inspections, ({one}) => ({
  reservation: one(reservations, {
    fields: [inspections.reservation_id],
    references: [reservations.id]
  })
}))