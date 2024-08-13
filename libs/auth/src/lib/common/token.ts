'use server';
import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { configEnv } from '@pkm/libs/env';

type TTokenPayload = {
  id: string;
  email: string;
};

export const generateToken = async (payload: TTokenPayload) => {
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
};

export const verifyToken = async (token: string) => {
  const secret = configEnv.AUTH_SECRET;
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  return payload as TTokenPayload;
};
