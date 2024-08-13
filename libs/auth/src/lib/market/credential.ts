import CredentialsProvider from 'next-auth/providers/credentials';
import { authSchema } from './schema';
import { checkEmail, checkPassword, getUserDataWithRoles } from './util';

export const credentialProvider = () =>
  CredentialsProvider({
    id: 'login',
    name: 'credentials',
    credentials: {
      email: { label: 'Email', type: 'email', placeholder: 'Masukkan email' },
      password: {
        label: 'Password',
        type: 'password',
        placeholder: '*********',
      },
    },
    async authorize(credentials) {
      const { data } = authSchema.safeParse(credentials);

      if (!data?.email || !data?.password) {
        throw new Error('Email dan Password wajib diisi');
      }

      const isUserExist = await checkEmail(data?.email);

      if (!isUserExist) {
        throw new Error('Akun tidak terdaftar');
      }

      const isPasswordCorrect = await checkPassword(
        data?.password,
        data?.email
      );

      if (!isPasswordCorrect) {
        throw new Error('Email atau Kata sandi tidak valid');
      }

      const userData = await getUserDataWithRoles(data?.email);

      const isEmailVerified = userData?.emailVerifiedAt;

      if (!isEmailVerified) {
        throw new Error('Email belum terverifikasi');
      }

      if (userData) {
        return {
          ...userData,
          role: {
            id: userData?.roles?.id as string,
            name: userData?.roles?.name as string,
            permissions: userData?.roles?.rolePermissions?.map(
              (rolePermission) => rolePermission.permission?.name
            ) as string[],
          },
        };
      } else {
        return null;
      }
    },
  });
