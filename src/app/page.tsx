'use client';

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Component() {
  const { data: session } = useSession();
  const router = useRouter();

  useLayoutEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session])

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}