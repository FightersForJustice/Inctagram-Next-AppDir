import React from "react";
import Image from "next/image";

import s from "./FoundUser.module.scss";

export const FoundUser = () => {
  return (
    <div className={s.search__wrapper}>
      <div className={s.search__header}>
        <Image
          className={s.search__header__image}
          src={"/img/profile/avatar.png"}
          alt={"avatar"}
          width={50}
          height={50}
        />
        <div>
          <p className={s.search__username}>Ekat Ivanova</p>
          <p className={s.search__name}>Ekaterina Ivanova</p>
        </div>
      </div>
    </div>
  );
};
