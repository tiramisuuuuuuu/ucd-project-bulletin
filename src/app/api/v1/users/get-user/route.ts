import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest, 
) {
    const user_id = req.headers.get("x-user-id")!;
    
    const arr = await db.select()
        .from(users)
        .where(eq(users.id, user_id));
    
    if (arr.length == 0) {
        return new NextResponse(
            JSON.stringify({ error: "Unable to fetch user" }), 
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