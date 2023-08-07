import React from "react";
import { ManagementCheckbox } from "../ManagementCheckbox/ManagementCheckbox";

import s from "./Subscription.module.scss";

export const Subscription = () => {
  return (
    <>
      <div className={s.subscription}>
        <p className={s.subscription__title}>Current Subscription:</p>
        <div className={s.subscription__wrapper}>
          <div className={s.subscription__container}>
            <p className={s.subscription__container__text}>Expire at</p>
            <p className={s.subscription__container__data}>12.12.2022</p>
          </div>
          <div className={s.subscription__container}>
            <p className={s.subscription__container__text}>Next payment</p>
            <p className={s.subscription__container__data}>13.02.2023</p>
          </div>
        </div>
      </div>

      <ManagementCheckbox />
    </>
  );
};
