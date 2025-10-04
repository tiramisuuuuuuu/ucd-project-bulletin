import { db } from "@/db/db";
import { bikes } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    const arr = await db.select()
        .from(bikes)
        .where(
            and(
                eq(bikes.donation_status, "complete"), 
                eq(bikes.reserved, false)
            )
        );
    
    return new NextResponse(
        JSON.stringify(arr), 
        {
            status: 200,
            headers: { "content-type": "application/json" },
        }
    );
}