import React from "react";
import s from "./Loader.module.scss";

export const Loader = () => {
  return (
    <div className={s.app__wrapper}>
      <div className={s.app__window}>
        <span className={s.loader}></span>
      </div>
    </div>
  );
};
