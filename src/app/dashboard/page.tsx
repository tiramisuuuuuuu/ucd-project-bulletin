import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Feed from '@/components/dashboard/Feed';
import UserContent from '@/components/dashboard/UserContent';


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

  return (
    <div className="w-full min-h-full">
      <Tabs defaultActiveKey="1" items={items}  />
    </div>
  );
}