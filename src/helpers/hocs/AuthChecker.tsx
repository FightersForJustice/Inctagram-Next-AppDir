"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks/useSelect";

interface AuthCheckerProps {
  children: React.ReactNode;
}

export const AuthChecker: React.FC<AuthCheckerProps> = ({ children }) => {
  const router = useRouter();
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  if (isAuth) {
    return <>{children}</>;
  } else {
    router.push("/sign-in");
    return <div></div>;
  }
};
