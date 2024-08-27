/* eslint-disable no-useless-catch */
'use server';
import 'server-only';
import { eq } from 'drizzle-orm';
import { signOut } from './auth';
import { db, users } from '@pkm/libs/drizzle/market';
import { hashPassword, verifyPassword } from '../common';
import { DatabaseError } from 'pg';

export const register = async (
  fullname: string,
  email: string,
  password: string
) => {
  try {
    const isUserExist = await checkEmail(email);

    if (isUserExist) {
      throw new Error('Terjadi Kesalahan');
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await db
      .insert(users)
      .values({
        fullname,
        email,
        password: hashedPassword,
        address: '',
        roleId: 2,
        emailVerifiedAt: new Date(),
      })
      .returning({
        id: users.id,
        email: users.email,
        fullname: users.fullname,
      });

    return newUser;
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};

export const checkEmail = async (email?: string | null) => {
  if (!email) return 'Email wajib diisi';
  try {
    const res = await db
      .select({ email: users.email })
      .from(users)
      .where(eq(users.email, email))
      .then((res) => res.length > 0);
    return res;
  } catch (err) {
    throw err;
  }
};

export const checkPassword = async (password?: string, email?: string) => {
  if (!password) return;
  if (!email) return;
  try {
    const hashedPassword = await db
      .select({ password: users.password })
      .from(users)
      .where(eq(users.email, email))
      .then((res) => res.at(0)?.password);

    if (hashedPassword) {
      const comparePassword = await verifyPassword(
        password,
        String(hashedPassword)
      );
      return comparePassword;
    }
  } catch (err) {
    throw err;
  }
};

export const getUserData = async (email?: string | null) => {
  if (!email) return;
  try {
    const res = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .then((res) => res.at(0));
    return res;
  } catch (err) {
    throw err;
  }
};

export const getUserDataWithRoles = async (email?: string | null) => {
  if (!email) return;
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
      with: {
        roles: {
          with: {
            rolePermissions: {
              with: {
                permission: true,
              },
            },
          },
        },
      },
    });

    console.log(user);

    return user;
  } catch (err) {
    throw err;
  }
};

export const logOut = async () => {
  try {
    return await signOut({
      redirect: true,
      redirectTo: '/auth/login',
    });
  } catch (err) {
    throw err;
  }
};
