import { boolean, json } from "drizzle-orm/gel-core";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { Ban } from "lucide-react";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  subID: varchar()
});

export const coursesTable = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid: varchar().notNull(),
  name: varchar().notNull(),
  description: varchar(),
  chapters: integer().notNull(),
  includeVideo: boolean().default(false),
  difficulty: varchar().notNull(),
  category: varchar().notNull(),
  courseJson: json(),
  bannerImageUrl: varchar().default(''),
  userEmail: varchar('user_email').references(() => usersTable.email),
});