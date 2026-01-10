import { db } from "@/db/db";
import { users } from "@/db/schema";
import { zUser } from "@/types/api/Users";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    req: NextRequest, 
) {
    const user_id = req.headers.get("x-user-id")!;
    const validatedData = zUser.safeParse(await req.json());

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
    
    const arr = await db.update(users)
        .set(parse)
        .where(eq(users.id, user_id))
        .returning();        

    if (arr.length == 0) {
        return new NextResponse(
            JSON.stringify({ error: "Unable to update user" }), 
            {
                status: 400,
                headers: { "content-type": "application/json" },
            }
        );
    }
    
    return new NextResponse(
        JSON.stringify(arr[0]), 
        {
            status: 200,
            headers: { "content-type": "application/json" },
        }
    );
}