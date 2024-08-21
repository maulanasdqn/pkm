import { NextPage } from 'next';
import { ReactElement } from 'react';
import { ProductsModule } from './_modules';

const ProductsPage: NextPage = (): ReactElement => {
  return <ProductsModule />;
};

export default ProductsPage;
