"use client";

import React, { ReactNode } from "react";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { AuthChecker } from "@/helpers/hocs";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <BaseLayout>
      <AuthChecker>{children}</AuthChecker>
    </BaseLayout>
  );
};

export default RootLayout;
