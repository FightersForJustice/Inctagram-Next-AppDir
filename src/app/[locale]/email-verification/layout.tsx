import React, { ReactNode } from "react";
import { Metadata } from "next";
import { BaseLayout } from "../../../components/BaseLayout/BaseLayout";

export const metadata: Metadata = {
  title: "Email confirmed",
  description: "Your email has been confirmed",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return <BaseLayout>{children}</BaseLayout>;
};

export default RootLayout;
