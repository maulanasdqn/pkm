import { MarketBreadcumb } from '@pkm/ui';
import { FC, ReactElement } from 'react';
import { ProductTable } from './data-table';
import { columns } from './column';
import { getAllProducts } from '@pkm/libs/actions/market';

export const ProductAdminModule: FC = async (): Promise<ReactElement> => {
  const products = await getAllProducts();

  return (
    <div className="w-full h-full flex flex-col font-source-sans-pro">
      <MarketBreadcumb
        title="Produk"
        currentLinkName="Produk"
        currentLinkUrl="/admin/produk"
        prevLinkName="Home"
        prevLinkUrl="/admin"
      />

      <h3 className="text-xl text-neutral-70% mt-12">Data Produk</h3>

      <ProductTable columns={columns} data={products.data} />
    </div>
  );
};
