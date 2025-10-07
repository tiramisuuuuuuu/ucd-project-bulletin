import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

interface StandardTextProps {
  level: 1 | 2 | 3 | 4 | 5;
  children: React.ReactNode;
  className?: string;
}

export default function StandardText({ level, children, className } : StandardTextProps) {
  return <Title level={level} className={className}>{children}</Title>
};