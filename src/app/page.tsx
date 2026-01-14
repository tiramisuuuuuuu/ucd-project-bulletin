'use client';

import StandardText from "@/components/ui/StandardText";
import { TitleFont } from "@/lib/fonts";
import { ArrowDownOutlined } from "@ant-design/icons";
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
    <div className="w-full h-full flex flex-col gap-10 p-10">
      <div className="self-center flex flex-col items-center">
        <Typography.Title level={2} className={`align-middle ${TitleFont.className}`}>Sign in to get started</Typography.Title>
      </div>
      <div className="self-center  flex flex-col items-center">
        <ArrowDownOutlined className="animate-bounce" />
      </div>
      <div className="self-center">
        <Button onClick={() => signIn()} type="primary">Sign in to get started</Button>
      </div>
    </div>
  )
}