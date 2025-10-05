import Step1 from './Step1';
import StepsWithContent from '../ui/Steps';

const steps = [
  {
    title: 'First',
    content: <Step1 />,
  },
  {
    title: 'Second',
    content: 'Second-content',
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