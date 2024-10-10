import { NextPage } from 'next';
import { LandingModule } from './_modules';

export const dynamic = 'auto';

const LandingPage: NextPage = () => {
  return <LandingModule />;
};

export default LandingPage;
