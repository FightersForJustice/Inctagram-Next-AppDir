import React from "react";
import s from "./ImagesCollection.module.scss";
import Image from "next/image";

export const ImagesCollection = () => {
  return (
    <div className={s.collection__container}>
      <Image src={"/img/create-post/plus.svg"} alt={"plus"} height={36} width={36} className={s.collection__plusBtn} />
      <div className={s.collection__items}>
        <div className={s.collection__item}>
          <Image
            src={"/img/create-post/imageCollection.png"}
            alt={"image-collection"}
            height={82}
            width={80}
            className={s.collection__image__collection}
          />
          <Image
            src={"/img/create-post/close.svg"}
            alt={"close"}
            width={12}
            height={12}
            className={s.collection__close}
          />
        </div>
      </div>
    </div>
  );
};
