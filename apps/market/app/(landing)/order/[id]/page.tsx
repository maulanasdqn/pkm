import { NextPage } from 'next';
import { ReactElement } from 'react';
import { OrderModule } from './_modules';

const OrderPage: NextPage<{ params: { id: string } }> = ({
  params: { id },
}): ReactElement => {
  return <OrderModule id={id} />;
};

export default OrderPage;
