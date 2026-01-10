"use client";

import { FloatButton, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Feed from '@/components/dashboard/Feed';
import UserContent from '@/components/dashboard/UserContent';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';


const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Feed',
    children: <Feed />,
  },
  {
    key: '2',
    label: 'My Content',
    children: <UserContent />,
  },
];

export default function Page() {
  const router = useRouter();

  return (
    <div className="w-full min-h-full">
      <Tabs defaultActiveKey="1" items={items}  />
      <FloatButton
        icon={<PlusOutlined />}
        description="POST"
        shape="square"
        style={{ insetInlineEnd: 24, width: 50, height: 50 }}
        onClick={() => router.push('/create-post')}
      />
    </div>
  );
}