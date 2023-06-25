import React, { PropsWithChildren } from "react";
import { NextPage } from "next";
import { Header } from "../Header/Header";

export const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
