import { db } from "@/db/db";
import { posts, users } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    const arr = await db.select({
        id: posts.id,
        title: posts.title,
        subtitle: posts.subtitle,
        tags: posts.tags,
        hasImage: sql<boolean>`array_length(${posts.images}, 1) > 0`,
        created_at: posts.created_at,
        updated_at: posts.updated_at,
        name: users.name,
        profile_image: users.profile_image,
        tagline: users.tagline,
    })
        .from(posts).leftJoin(users, eq(users.id, posts.user_id));
    
    return new NextResponse(
        JSON.stringify(arr), 
        {
            status: 200,
            headers: { "content-type": "application/json" },
        }
    );
}