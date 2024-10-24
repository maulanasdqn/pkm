import { NextPage } from 'next';
import { ReactElement } from 'react';
import { MessagesAdminModule } from './_modules';

const messagesPage: NextPage = (): ReactElement => {
  return <MessagesAdminModule />;
};

export default messagesPage;
