import { db } from "@/db/db";
import { bikes, pendingDonations } from "@/db/schema";
import { zUpdateBikeRequest } from "@/types/api/Bikes";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    req: NextRequest, 
    { params }: { params: { id: string } }
) {
    const validatedData = zUpdateBikeRequest.safeParse(await req.json());

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

    const arr = await db.update(bikes)
        .set({
            donation_status: "complete",
            ...parse
        })
        .where(eq(bikes.id, params.id))
        .returning();

    const bike = arr[0]
        
    await db.delete(pendingDonations)
        .where(eq(pendingDonations.bike, bike.id));
    
    return new NextResponse(
        JSON.stringify(bike), 
        {
            status: 200,
            headers: { "content-type": "application/json" },
        }
    ); 
}