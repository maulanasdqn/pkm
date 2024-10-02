import { NextPage } from 'next';
import { ProductAdminModule } from './_modules';
export const dynamic = 'force-dynamic';

const ProductPage: NextPage = () => {
  return <ProductAdminModule />;
};

export default ProductPage;
