import { ReactElement } from 'react';
import { NextPage } from 'next';
import { ReservationModule } from './_modules';

const ReservationPage: NextPage = (): ReactElement => {
  return <ReservationModule />;
};

export default ReservationPage;
