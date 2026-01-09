import { db } from "@/db/db";
import { posts } from "@/db/schema";
import { makeImagePublic } from "@/lib/publish-images";
import { zPost } from "@/types/api/Posts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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

    const arr = await db.insert(posts)
        .values({user_id, ...parse, images: public_images})
        .returning();

    const post = arr[0]
    
    return new NextResponse(
        JSON.stringify(post), 
        {
            status: 200,
            headers: { "content-type": "application/json" },
        }
    ); 
}