import { relations } from "drizzle-orm/relations";
import { users, courses } from "./schema";

export const coursesRelations = relations(courses, ({one}) => ({
	user: one(users, {
		fields: [courses.userEmail],
		references: [users.email]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	courses: many(courses),
}));