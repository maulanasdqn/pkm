"use client";
import { SessionProvider } from "next-auth/react";
import { FC, PropsWithChildren, ReactElement } from "react";

export const AuthProvider: FC<PropsWithChildren> = (props): ReactElement => {
  return <SessionProvider>{props.children}</SessionProvider>;
};
