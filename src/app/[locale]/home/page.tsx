"use client";

import React from "react";
import { Navigation } from "../my-profile/Navigation/Navigation";
import { usePathname } from "next-intl/client";

import s from "./Home.module.scss";
import { HomePagePost } from "./HomePagePost/HomePagePost";

const Home = () => {
  const pathname = usePathname();

  return (
    <div className={s.container}>
      <div className={s.wrapper} id={"wrapper"}>
        <Navigation pathname={pathname} paidAccount={false} />
        <div style={{ gridArea: "profile" }}>
          <HomePagePost />
          <HomePagePost />
        </div>
      </div>
    </div>
  );
};

export default Home;
