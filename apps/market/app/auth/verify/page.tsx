import { getOneUser, verifyEmail } from '@pkm/libs/actions/market';
import { verifyToken } from '@pkm/libs/auth';
import { NextPage } from 'next';
import { redirect } from 'next/navigation';
import { ReactElement } from 'react';

type SearchParams = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const VerifyPage: NextPage<SearchParams> = async ({
  searchParams,
}): Promise<ReactElement> => {
  const token = (await searchParams).token as string;

  if (!token) {
    redirect('/');
  }

  const validToken = await verifyToken(token);

  if (!validToken) {
    redirect('/');
  }

  if (!validToken.id) {
    redirect('/');
  }

  const user = await getOneUser(validToken.id);

  if (!user.status.ok) {
    redirect('/');
  }

  if (user.data?.emailVerifiedAt) {
    redirect('/');
  }

  const update = await verifyEmail(validToken.id);

  return (
    <div className="flex flex-col gap-2 items-center justify-center text-center text-xl font-semibold">
      {update?.message || 'Sedang melakukan verifikasi email...'}
    </div>
  );
};

export default VerifyPage;
