'use client';

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Component() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push('/dashboard');
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}