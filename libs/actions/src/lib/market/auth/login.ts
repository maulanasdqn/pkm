'use server';

import { signIn } from '@pkm/libs/auth/market';
import { TLoginSchemaMarket, TUser } from '@pkm/libs/entities';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export const Login = async (payload: TLoginSchemaMarket) => {
  try {
    const { email, password } = payload;

    const user: TUser = await signIn('login', {
      email,
      password,
      redirect: false,
    });

    if (user?.role?.id === 1) {
      redirect('/admin/dashboard');
    } else {
      redirect('/');
    }
  } catch (error) {
    if (error instanceof AuthError) {
      throw error.cause?.err;
    }
    throw error;
  }
};
