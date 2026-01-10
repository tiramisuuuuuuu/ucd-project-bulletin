import { db } from "@/db/db";
import { posts, users } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest, 
) {
    const user_id = req.headers.get("x-user-id")!;
    
    const arr = await db.select({
        id: posts.id,
        title: posts.title,
        subtitle: posts.subtitle,
        tags: posts.tags,
        hasImage: sql<boolean>`cardinality(${posts.images}) > 0`,
        clicks: posts.clicks,
        created_at: posts.created_at,
        updated_at: posts.updated_at,
        name: users.name,
        profile_image: users.profile_image,
        tagline: users.tagline,
    })
        .from(posts)
        .leftJoin(users, eq(users.id, posts.user_id))
        .where(eq(posts.user_id, user_id));
    
    return new NextResponse(
        JSON.stringify(arr), 
        {
            status: 200,
            headers: { "content-type": "application/json" },
        }
    );
}