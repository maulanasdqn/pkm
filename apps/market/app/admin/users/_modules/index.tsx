import { MarketBreadcumb } from '@pkm/ui';
import { FC, ReactElement } from 'react';
import { ProductTable } from './data.table';
import { columns } from './column';
import { getAllUsers } from '@pkm/libs/actions/market';

export const UsersAdminModule: FC = async (): Promise<ReactElement> => {
  const users = await getAllUsers();

  return (
    <div className="w-full h-full flex flex-col gap-12">
      <MarketBreadcumb
        title="Manajemen Pengguna"
        currentLinkName="Manajemen Pengguna"
        currentLinkUrl="/admin/users"
        prevLinkName="Home"
        prevLinkUrl="/admin"
      />

      <ProductTable data={users?.data} columns={columns} />
    </div>
  );
};
