import Step1 from './Step1';
import StepsWithContent from '../ui/Steps';
import Step2 from './Step2';

const steps = [
  {
    title: 'First',
    content: <Step1 />,
  },
  {
    title: 'Second',
    content: <Step2 />,
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];

export default function DonationSteps() {

  return (
    <StepsWithContent steps={steps} />
  );
};