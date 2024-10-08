export type TUser = {
  id: string;
  fullname?: string | null;
  image?: string | null;
  phoneNumber?: string | null;
  gender?: 'male' | 'female' | null;
  email: string;
  emailVerified: Date | null;
  address?: string | null;
  password: string;
  role: {
    id: string | number;
    name: string;
    permissions: string[];
  };
  createdAt?: Date | null;
  updatedAt?: Date | null;
};
