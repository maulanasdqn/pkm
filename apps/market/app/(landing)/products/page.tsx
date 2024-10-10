import { NextPage } from 'next';
import { ReactElement } from 'react';
import { ProductsModule } from './_modules';

export const dynamic = 'force-dynamic';

const ProductsPage: NextPage = (): ReactElement => {
  return <ProductsModule />;
};

export default ProductsPage;
