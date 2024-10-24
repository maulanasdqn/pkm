import { NextPage } from 'next';
import { CategoriesModule } from '../_modules';
import { getProductsByCategory } from '@pkm/libs/actions/market';
import { redirect } from 'next/navigation';

const CategoriesIdPage: NextPage<{ params: { id: string } }> = async ({
  params,
}) => {
  const { status } = await getProductsByCategory(params.id);

  if (!status.ok) {
    redirect('/');
  }

  return <CategoriesModule id={params.id} />;
};

export default CategoriesIdPage;
