import { pgTable, unique, integer, varchar, foreignKey, boolean, json } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "users_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	subId: varchar(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const courses = pgTable("courses", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "courses_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	cid: varchar().notNull(),
	name: varchar().notNull(),
	description: varchar(),
	chapters: integer().notNull(),
	includeVideo: boolean().default(false),
	difficulty: varchar().notNull(),
	category: varchar(),
	courseJson: json(),
	userEmail: varchar("user_email"),
}, (table) => [
	foreignKey({
			columns: [table.userEmail],
			foreignColumns: [users.email],
			name: "courses_user_email_users_email_fk"
		}),
]);
