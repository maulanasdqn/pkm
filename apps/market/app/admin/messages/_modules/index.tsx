import { MarketBreadcumb } from '@pkm/ui';
import { FC, ReactElement } from 'react';
import { MessagesTable } from './data.table';
import { getAllMessages } from '@pkm/libs/actions/market';
import { columns } from './column';

export const MessagesAdminModule: FC = async (): Promise<ReactElement> => {
  const messages = await getAllMessages();

  return (
    <div className="w-full h-full flex flex-col gap-12">
      <MarketBreadcumb
        title="Pesan"
        currentLinkName="Pesan"
        currentLinkUrl="/admin/messages"
        prevLinkName="Home"
        prevLinkUrl="/admin"
      />

      <MessagesTable data={messages?.data} columns={columns} />
    </div>
  );
};
