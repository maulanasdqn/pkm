import { NextPage } from 'next';
import { UsersAdminModule } from './_modules';
export const dynamic = 'force-dynamic';

const UsersPage: NextPage = () => {
  return <UsersAdminModule />;
};

export default UsersPage;
