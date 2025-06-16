import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request) {

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');

    const result = await db.select().from(coursesTable).where(eq(coursesTable.cid, courseId));

    console.log("Course details:", result);


    return NextResponse.json(result[0])
}