import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

interface StandardTextProps {
  level: 1 | 2 | 3 | 4 | 5;
  children: React.ReactNode;
}

export default function StandardText({ level, children } : StandardTextProps) {
  return (
  <>
    <Title level={level}>{children}</Title>
  </>
  )
};