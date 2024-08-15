import { NextPage } from 'next';
import { Button } from '@pkm/ui';
import { ReactElement } from 'react';
const Page: NextPage = (): ReactElement => {
  return (
    <div className="bg-white h-screen flex justify-center items-center flex-col">
      <h1>Waduh</h1>
      <Button>Button</Button>
    </div>
  );
};

export default Page;
