'use client';

import { Button, Typography } from "antd";
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
    <div className="w-full h-full flex flex-col gap-10 p-10 pt-30">
      <div className="self-center">
        <Typography.Title level={2} className="align-middle">"Alone we can do so little; together we can do so much"</Typography.Title>
      </div>
      <div className="self-center">
        <Button onClick={() => signIn()}>Sign in to get started</Button>
      </div>
    </div>
  )
}