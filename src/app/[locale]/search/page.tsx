"use client";

import React from "react";
import s from "./Search.module.scss";
import { Navigation } from "../my-profile/Navigation";
import { usePathname } from "next-intl/client";
import { SearchContent } from "./SearchContent";

const Page = () => {
  const pathname = usePathname();

  return (
    <div className={s.container}>
      <div className={s.wrapper} id={"wrapper"}>
        <Navigation pathname={pathname} paidAccount={false} />
        <SearchContent />
      </div>
    </div>
  );
};

export default Page;
