"use client";

import { SessionProvider } from "next-auth/react";

export interface AuthContextProps {
  children: React.ReactNode;
}

export default function AuthContext({ 
  children
}: Readonly<AuthContextProps>) {
  return <SessionProvider>{children}</SessionProvider>;
}
