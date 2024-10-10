import { NextPage } from 'next';
import { ReactElement } from 'react';
import { ProductIdModule } from './_modules';
import { getOneProduct } from '@pkm/libs/actions/market';
import { Products } from '@pkm/libs/drizzle/market';

const ProductIdPage: NextPage<{
  params: { id: string };
}> = async ({ params: { id } }): Promise<ReactElement> => {
  const product = await getOneProduct(id);

  return <ProductIdModule product={product.data as Products} />;
};

export default ProductIdPage;
