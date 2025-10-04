import { db } from "@/db/db";
import { bikes, pendingDonations } from "@/db/schema";
import { zCreateBikeRequest } from "@/types/api/Bikes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const user_id = req.headers.get("x-user-id")!;

    const validatedData = zCreateBikeRequest.safeParse(await req.json());

    if (!validatedData.success) {
        return new NextResponse(
            JSON.stringify({ error: "Invalid request body" }), 
            {
                status: 400,
                headers: { "content-type": "application/json" },
            }
        );
    }

    const parse = validatedData.data;

    const arr = await db.insert(bikes)
        .values(parse)
        .returning();

    const bike = arr[0]
    
    await db.insert(pendingDonations)
        .values({
            user: user_id,
            bike: bike.id
        })
        .returning();
    
    return new NextResponse(
        JSON.stringify("Successfully started donation"), 
        {
            status: 200,
            headers: { "content-type": "application/json" },
        }
    ); 
}