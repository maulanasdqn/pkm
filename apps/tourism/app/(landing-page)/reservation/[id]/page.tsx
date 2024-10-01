import { NextPage } from 'next';
import { ReactElement } from 'react';
import { CreateReservationModule } from './_modules';

const CreateReservationPage: NextPage<{ params: { id: string } }> = ({
  params: { id },
}): ReactElement => {
  return <CreateReservationModule id={id} />;
};

export default CreateReservationPage;
