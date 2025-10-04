import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (token?.id) {
        const requestHeaders = new Headers(req.headers);
        requestHeaders.set("x-user-id", token.id.toString());

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
