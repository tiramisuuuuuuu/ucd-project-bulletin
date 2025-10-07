import { db } from "@/db/db";
import { bikes, users } from "@/db/schema";
import { makeImagePublic } from "@/lib/publish-images";
import { zUpdateBikeRequest } from "@/types/api/Bikes";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    const user_id = req.headers.get("x-user-id")!;

    const arr = await db
        .select({
            bike_id: users.reserved_bike
        })
        .from(users)
        .where(eq(users.id, user_id));
    
    const { bike_id } = arr[0];

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
    
    const user = await db.update(users)
        .set({
            reserved_bike: null,
        })
        .where(eq(users.id, user_id))
        .returning();


    if (bike_id) {
        parse.dropoff_image = await Promise.all(
            parse.dropoff_image?.map(async (supabase_file_path) => await makeImagePublic(supabase_file_path) ?? '') ?? []
        );

        await db.update(bikes)
            .set({
                reserved: false,
                ...parse
            })
            .where(eq(bikes.id, bike_id));
    }
    
    return new NextResponse(
        JSON.stringify(user), 
        {
            status: 200,
            headers: { "content-type": "application/json" },
        }
    ); 
}