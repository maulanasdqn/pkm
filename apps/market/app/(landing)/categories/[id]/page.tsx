import { NextPage } from 'next';
import { CategoriesModule } from '../_modules';

const CategoriesIdPage: NextPage<{ params: { id: string } }> = ({ params }) => {
  return <CategoriesModule id={params.id} />;
};

export default CategoriesIdPage;
