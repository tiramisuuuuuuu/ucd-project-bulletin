import Step1 from '@/components/donate-bike/Step1';
import StepsWithContent from '@/components/ui/StepsWithContent';
import Step2 from '@/components/donate-bike/Step2';
import { useState } from 'react';
import { Button, Form, message } from 'antd';
import Step3 from '@/components/donate-bike/Step3';

export default function DonationSteps() {
  const [current, setCurrent] = useState(0);
  const [extendForm, setExtendForm] = useState(false);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const [form] = Form.useForm();

  const steps = [
    {
      title: 'Instructions',
      content: <Step1 />,
    },
    {
      title: 'Upload bike details',
      content: <Step2 form={form} setExtendForm={setExtendForm} />,
    },
    {
      title: 'Save and continue at dropoff',
      content: 'Last-content',
    },
    {
      title: 'Upload dropoff details',
      content: <Step3 form={form} />,
    },
    {
      title: 'Submit',
      content: 'Submit-page',
    },
  ];

  const handleSubmit = async () => {
    form.submit();
    if (await form.validateFields()) {
      next();
    }
  }

  return (
    <StepsWithContent
      steps={extendForm ? 
        steps.filter((step, idx) => idx !== 2) 
        : 
        steps.filter((step, idx) => idx !== 3 && idx !== 4)
      }
      current={current}
      prev={prev}
      nextButton={
        <>
          {current === 0 ? (
            <Button type="primary" onClick={() => next()}>
              Get Started
            </Button>
            ) 
            :
            current < steps.length - 1 && (
              <Button type="primary" onClick={handleSubmit}>
                Next
              </Button>
            )
          }
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
        </>
      }
    />
  );
};