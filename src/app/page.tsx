'use client';

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function Component() {
  const { data: session } = useSession()
  const router = useRouter()

  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )

}