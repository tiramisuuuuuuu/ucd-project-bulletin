import { db } from "@/db/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: `${process.env.GOOGLE_CLIENT_ID}`,
            clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user }) {
            if (!user.email) return false;

            const existing_user = await db.select()
                .from(users)
                .where(eq(users.email, user.email));

            if (!existing_user) {
                await db.insert(users)
                    .values({
                        email: user.email
                    });
            }

            return true;
        },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
