'use server';
import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { configEnv } from '@pkm/libs/env';

type TTokenPayload = {
  id: string;
  email: string;
};

export const generateToken = async (payload: TTokenPayload) => {
  try {
    const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 1000);
    const secret = configEnv.AUTH_SECRET;
    const token = new SignJWT({
      id: payload.id,
      email: payload.email,
      expiresAt,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(expiresAt)
      .sign(new TextEncoder().encode(secret));
    return token;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const verifyToken = async (token: string) => {
  try {
    const secret = configEnv.AUTH_SECRET;
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    return payload as TTokenPayload;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return null;
    }
  }
};
