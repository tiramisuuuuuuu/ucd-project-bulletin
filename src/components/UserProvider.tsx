"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { zUser } from "@/types/Users";
import { userAtom } from "@/lib/atoms";

export default function UserProvider({ children }: { children: React.ReactNode }) {
    const [_, setUser] = useAtom(userAtom);
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            if (!session) {
                router.push('/');
                setLoading(false);
                return;
            }

            const res = await fetch('/api/v1/users/get-user');
            const validatedData = zUser.safeParse(await res.json());
            if (!validatedData.success) {
                await signOut();
                router.push('/')
                return;
            }

            setUser(validatedData.data);
            setLoading(false);
        }

        if (status !== "loading") {
        fetchUser();
        }
    }, [session, status]);

    if (loading) {
        return (
        <>
            <button>Loading</button>
        </>
        )
    }

    return <>{children}</>
}
