import { db } from "@/db/db";
import { posts, users } from "@/db/schema";
import { and, eq, not } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest, 
    { params }: { params: { id: string } }
) {
    const user_id = req.headers.get("x-user-id")!;
    const arr = await db
        .select({
            id: posts.id,
            title: posts.title,
            subtitle: posts.subtitle,
            description: posts.description,
            tags: posts.tags,
            images: posts.images,
            contact_info: posts.contact_info,
            clicks: posts.clicks,
            created_at: posts.created_at,
            updated_at: posts.updated_at,
            name: users.name,
            profile_image: users.profile_image,
            tagline: users.tagline,
        })
        .from(posts)
        .leftJoin(users, eq(posts.user_id, users.id))
        .where(eq(posts.id, params.id));

    if (arr.length == 0) {
        return new NextResponse(
            JSON.stringify({ error: "Unable to fetch post" }), 
            {
                status: 400,
                headers: { "content-type": "application/json" },
            }
        );
    }

    const post = arr[0];

    await db.update(posts)
        .set({
            clicks: post.clicks! + 1
        })
        .where(and(eq(posts.id, post.id), not(eq(posts.user_id, user_id))));
    
    return new NextResponse(
        JSON.stringify(post), 
        {
            status: 200,
            headers: { "content-type": "application/json" },
        }
    );
}