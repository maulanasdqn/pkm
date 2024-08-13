'use client';

import { ControlledTextField } from '@pkm/ui';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';

const Page: NextPage = () => {
  const { control } = useForm({
    mode: 'all',
  });

  return (
    <div className="p-12">
      <ControlledTextField
        name="Test"
        control={control}
        placeholder="Label"
        variant="error"
        errorMessage="This is an error message"
      />
    </div>
  );
};

export default Page;
