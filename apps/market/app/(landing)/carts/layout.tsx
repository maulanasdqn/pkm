import { auth } from '@pkm/libs/auth/market';
import { MarketRoles } from '@pkm/libs/entities';
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

  if (session?.user.role.id !== MarketRoles.USER) {
    redirect('/');
  }

  return <Fragment>{children}</Fragment>;
}
