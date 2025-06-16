import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
const {email, name} = await req.json();

//user exists
const users = await db.select()
.from(usersTable)
.where(eq(usersTable.email, email));

//if not user exists, insert new user
if (users?.length == 0) {
    const result = await db.insert(usersTable).values({
        email: email,
        name: name,
    }).returning(usersTable);

    console.log("User created:", result);
    return NextResponse.json(result);
}

    return NextResponse.json(users[0])
}