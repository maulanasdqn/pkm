import { VLogin } from '../../entities/validation';
import CredentialsProvider from 'next-auth/providers/credentials';
import { checkEmail, checkPassword, getUserData } from './util';

export const credentialsProvider = CredentialsProvider({
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
    const { data } = VLogin.safeParse(credentials);

    if (!data?.email || !data?.password) {
      throw new Error('Email dan Password wajib diisi');
    }

    const isUserExist = await checkEmail(data?.email);

    if (!isUserExist) {
      throw new Error('Akun tidak terdaftar');
    }

    const isPasswordCorrect = await checkPassword(data?.password, data?.email);

    if (!isPasswordCorrect) {
      throw new Error('Email atau Kata sandi tidak valid');
    }

    const user = await getUserData(data?.email);

    const isEmailVerified = user?.emailVerified;

    if (!isEmailVerified) {
      throw new Error('Email belum terverifikasi');
    }

    if (user) {
      return user;
    } else {
      return null;
    }
  },
});
