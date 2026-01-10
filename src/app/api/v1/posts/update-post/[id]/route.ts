import { db } from "@/db/db";
import { posts } from "@/db/schema";
import { makeImagePublic } from "@/lib/publish-images";
import { zPost } from "@/types/api/Posts";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    req: NextRequest, 
    { params }: { params: { id: string } }
) {
    const user_id = req.headers.get("x-user-id")!;
    const validatedData = zPost.safeParse(await req.json());

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

    const public_images = await Promise.all(
        parse.images.map(async (supabase_file_path: string) => await makeImagePublic(supabase_file_path) ?? '') ?? []
    );

    const arr = await db.update(posts)
        .set({
            ...parse,
            images: public_images
        })
        .where(and(eq(posts.id, params.id), eq(posts.user_id, user_id)))
        .returning();

    if (arr.length == 0) {
        return new NextResponse(
            JSON.stringify({ error: "Unable to update post" }), 
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