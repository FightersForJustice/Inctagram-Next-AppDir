"use client";

import React, { ReactNode } from "react";
import { AuthChecker } from "@/helpers/hocs";
import { BaseLayout } from "@/components/layouts/BaseLayout";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <BaseLayout>
      <AuthChecker>{children}</AuthChecker>
    </BaseLayout>
  );
};

export default RootLayout;
