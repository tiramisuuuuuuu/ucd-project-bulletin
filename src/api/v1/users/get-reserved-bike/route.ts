import { db } from "@/db/db";
import { bikes, pendingDonations, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const user_id = req.headers.get("x-user-id")!;

    const arr = await db
        .select({
            bike_id: users.reserved_bike
        })
        .from(users)
        .where(eq(pendingDonations.user, user_id));

    const { bike_id } = arr[0]

    if (bike_id) {
        const bikeArr = await db.select()
            .from(bikes)
            .where(eq(bikes.id, bike_id));
        
        return new NextResponse(
            JSON.stringify(bikeArr[0]), 
            {
                status: 200,
                headers: { "content-type": "application/json" },
            }
        );
    }
    
    return new NextResponse(
        JSON.stringify([]), 
        {
            status: 200,
            headers: { "content-type": "application/json" },
        }
    );
}