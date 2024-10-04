'use client';
import { createContext, useContext, useState } from 'react';

const initialData = {
  email: '',
  isForgotPassword: false,
};

type TForgotPasswordData = {
  email: string;
  isForgotPassword: boolean;
};

export type TForgotPasswordContext = {
  data: TForgotPasswordData | null;
  setData: React.Dispatch<React.SetStateAction<TForgotPasswordData | null>>;
};

export type TForgotPasswordContextProvider = {
  children: React.ReactNode;
};

const ForgotPasswordContext = createContext<TForgotPasswordContext | null>(
  null
);
export const ForgotPasswordContextProvider = ({
  children,
}: TForgotPasswordContextProvider) => {
  const [data, setData] = useState<TForgotPasswordData | null>(initialData);

  return (
    <ForgotPasswordContext.Provider value={{ data, setData }}>
      {children}
    </ForgotPasswordContext.Provider>
  );
};

export const useForgotPasswordContext = () => {
  const context = useContext(ForgotPasswordContext);
  if (!context) {
    throw new Error(
      'useForgotPasswordContext should be used within <ForgotPasswordContextProvider>'
    );
  }
  return context;
};
