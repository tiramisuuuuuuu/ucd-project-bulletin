import React from 'react';
import { Button, Steps, theme } from 'antd';

interface step {
  title: string;
  content: React.ReactNode;
}

interface StepsProps {
  steps: step[];
  current: number;
  prev: () => void;
  nextButton: React.ReactNode;
}

export default function StepsWithContent({ steps, current, prev, nextButton } : StepsProps) {
  const { token } = theme.useToken();

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    marginTop: 16,
  };

  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {nextButton}
        {current == 1 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};