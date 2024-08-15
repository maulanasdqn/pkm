'use client';

import { Alert, Button, ControlledTextField } from '@pkm/ui';
import { NextPage } from 'next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Page: NextPage = () => {
  const { control } = useForm({
    mode: 'all',
  });

  const [show, setShow] = useState(false);

  return (
    <div className="p-12 flex flex-col gap-12">
      <ControlledTextField
        name="Test"
        control={control}
        placeholder="Label"
        variant="error"
        errorMessage="This is an error message"
      />

      <Button onClick={() => setShow(true)}>Alert</Button>

      <Alert message="Test" onHide={() => setShow(false)} show={show} />
    </div>
  );
};

export default Page;
