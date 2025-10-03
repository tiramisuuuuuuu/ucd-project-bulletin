import { NextRequest, NextResponse } from "next/server";
import { db } from "./db/db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (token?.email) {
        const user = await db.select()
            .from(users)
            .where(eq(users.email, token.email));

        const requestHeaders = new Headers(req.headers);
        requestHeaders.set("x-user-id", user[0].id);

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }

    return new NextResponse(
        JSON.stringify({ error: "Not signed in" }), 
        {
            status: 401,
            headers: { "content-type": "application/json" },
        }
    );
}

export const config = {
  matcher: "/api/v1/:path*",
};
