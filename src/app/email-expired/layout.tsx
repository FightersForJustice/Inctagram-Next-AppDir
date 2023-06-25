import React, { ReactNode } from "react";
import { BaseLayout } from "../../components/BaseLayout/BaseLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email expired",
  description: "Email verification link expired",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return <BaseLayout>{children}</BaseLayout>;
};

export default RootLayout;
