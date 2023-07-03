import { ReactNode } from "react";
import { Metadata } from "next";
import { BaseLayout } from "../../../../components/BaseLayout/BaseLayout";

export const metadata: Metadata = {
  title: "Create New Password",
  description: "Create New Password",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return <BaseLayout>{children}</BaseLayout>;
};

export default RootLayout;
