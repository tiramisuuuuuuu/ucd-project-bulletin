import Step1 from '@/components/donate-bike/Step1';
import StepsWithContent from '@/components/ui/StepsWithContent';
import Step2 from '@/components/donate-bike/Step2';
import { useState } from 'react';
import { Button, Form } from 'antd';
import Step3 from '@/components/donate-bike/Step3';
import { PostDetail } from '@/types/Posts';
import { useAtom } from 'jotai';
import { userAtom } from '@/lib/atoms';

export default function DonationSteps() {
  const [current, setCurrent] = useState(0);
  const [post, setPost] = useState<PostDetail | null>(null);
  const [user, _] = useAtom(userAtom);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const [form] = Form.useForm();

  const steps = [
    {
      title: 'Details',
      content: <Step1 form={form} />,
    },
    {
      title: 'Preview',
      content: <Step2 post={post} />,
    },
    {
      title: 'Submitting',
      content: <Step3 form={form} />,
    },
  ];

  const handleNext = async () => {
    //form.submit();
    if (await form.validateFields()) {
      setPost({
        title: form.getFieldValue('title') ?? '',
        subtitle: form.getFieldValue('subtitle') ?? '',
        description: form.getFieldValue('description') ?? '',
        tags: form.getFieldValue('tags') ?? [],
        images: form.getFieldValue('images') ?? [],
        contact_info: form.getFieldValue('conatct_info') ?? '',
        clicks: 0,
        created_at: new Date(),
        updated_at: null,
        name: user?.name ?? null,
        profile_image: user?.profile_image ?? null,
        tagline: user?.tagline ?? null,
      })
      next();
    }
  }

  // const handleSubmit = async () => {
  //   //form.submit();
  //   if (await form.validateFields()) {
  //     next();
  //   }
  // }

  return (
    <StepsWithContent
      steps={steps}
      current={current}
      prev={prev}
      nextButton={
        <>
          {current === 0 ? (
            <Button type="primary" onClick={handleNext}>
              Preview Post
            </Button>
            ) 
            :
            current === 1 && (
              <Button type="primary" onClick={() => next()}>
                Submit
              </Button>
            )
          }
        </>
      }
    />
  );
};