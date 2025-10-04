import { db } from "@/db/db";
import { bikes, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    req: NextRequest, 
    { params }: { params: { id: string } }
) {
    const user_id = req.headers.get("x-user-id")!;

    const bike = await db.update(bikes)
        .set({
            reserved: true
        })
        .where(
            and(
                eq(bikes.id, params.id),
                eq(bikes.reserved, false)
            )
        )
        .returning();

    if (!bike) {
        return new NextResponse(
            JSON.stringify({ error: "Bike has been reserved by another user" }), 
            {
                status: 409,
                headers: { "content-type": "application/json" },
            }
        );
    }

    const user = await db.update(users)
        .set({
            reserved_bike: params.id
        })
        .where(eq(users.id, user_id))
        .returning();
    
    return new NextResponse(
        JSON.stringify(user), 
        {
            status: 200,
            headers: { "content-type": "application/json" },
        }
    ); 
}