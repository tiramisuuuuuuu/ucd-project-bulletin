import { db } from "@/db/db";
import { bikes, pendingDonations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest, 
    { params }: { params: { id: string } }
) {
    await db.delete(bikes)
        .where(eq(bikes.id, params.id));

    await db.delete(pendingDonations)
        .where(eq(pendingDonations.bike, params.id));
    
    return new NextResponse(
        JSON.stringify("Successfully deleted"), 
        {
            status: 200,
            headers: { "content-type": "application/json" },
        }
    ); 
}