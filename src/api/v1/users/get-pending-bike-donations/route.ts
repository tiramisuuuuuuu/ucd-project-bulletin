import { db } from "@/db/db";
import { bikes, pendingDonations } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const user_id = req.headers.get("x-user-id")!;

    const arr = await db.select()
        .from(pendingDonations)
        .where(eq(pendingDonations.user, user_id));

    const bikeIds = arr.map(d => d.bike!);

    const bikesArr = await db.select()
        .from(bikes)
        .where(inArray(bikes.id, bikeIds));
    
    return new NextResponse(
        JSON.stringify(bikesArr), 
        {
            status: 200,
            headers: { "content-type": "application/json" },
        }
    );
}