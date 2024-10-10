import { NextPage } from 'next';
import { LandingModule } from './_modules';

export const dynamic = 'force-dynamic';

const LandingPage: NextPage = () => {
  return <LandingModule />;
};

export default LandingPage;
