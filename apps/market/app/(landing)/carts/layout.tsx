import { auth } from '@pkm/libs/auth/market';
import { redirect } from 'next/navigation';
import { Fragment } from 'react';

export default async function CartsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  return <Fragment>{children}</Fragment>;
}
