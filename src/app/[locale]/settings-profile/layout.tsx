import React, { ReactNode } from "react";
import { Metadata } from "next";
import { BaseLayout } from "../../../components/BaseLayout/BaseLayout";

export const metadata: Metadata = {
  title: "Profile settings",
  description: "User profile settings",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return <BaseLayout>{children}</BaseLayout>;
};

export default RootLayout;
