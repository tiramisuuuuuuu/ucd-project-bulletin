import { db } from "@/db/db";
import { bikes, pendingDonations } from "@/db/schema";
import { makeImagePublic } from "@/lib/publish-images";
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

    const public_bikes_images = await Promise.all(
        bike.bike_image?.map(async (supabase_file_path) => await makeImagePublic(supabase_file_path) ?? '') ?? []
    );
    
    const public_dropoff_images = await Promise.all(
        bike.dropoff_image?.map(async (supabase_file_path) => await makeImagePublic(supabase_file_path) ?? '') ?? []
    );
        
    await db.update(bikes)
        .set({
            bike_image: public_bikes_images,
            dropoff_image: public_dropoff_images
        })
        .where(eq(bikes.id, params.id))
        .returning();

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