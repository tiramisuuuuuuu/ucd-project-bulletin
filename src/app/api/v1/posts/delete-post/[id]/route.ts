import { db } from "@/db/db";
import { posts } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest, 
    { params }: { params: { id: string } }
) {
    const user_id = req.headers.get("x-user-id")!;

    await db.delete(posts)
        .where(and(eq(posts.id, params.id), eq(posts.user_id, user_id)));

    return new NextResponse(
        JSON.stringify("Successfully deleted"), 
        {
            status: 200,
            headers: { "content-type": "application/json" },
        }
    ); 
}