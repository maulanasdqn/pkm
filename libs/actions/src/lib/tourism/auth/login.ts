'use server';
import 'server-only';
import { AuthError } from 'next-auth';
import { signIn } from '@pkm/libs/auth/tourism';
import { TLoginSchema } from '@pkm/libs/entities';

export const login = async (value: TLoginSchema) => {
  const { email, password } = value;
  try {
    await signIn('login', {
      email,
      password,
      redirect: true,
      redirectTo: '/dashboard',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      throw error.cause?.err;
    }
    throw error;
  }
};
