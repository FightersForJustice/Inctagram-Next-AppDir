"use client";

import React, { ReactNode } from "react";
import { Header } from "@/components/Header/Header";
import { useGetAuthMeQuery } from "@/api";
import { Loader } from "@/components/Loader";

type Props = {
  title?: string;
  children: ReactNode;
};

export const BaseLayout: React.FC<Props> = ({ children }: Props) => {
  const { isLoading } = useGetAuthMeQuery();
  if (isLoading) return <Loader />;
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
