import React, { Dispatch, SetStateAction, useEffect } from "react";
import s from "./ImagesCollection.module.scss";
import Image from "next/image";
import { ImageType } from "../../app/[locale]/my-profile/CreatePost/CreatePost";

type Props = {
  loadedImages: ImageType[];
  setLoadedImages: Dispatch<SetStateAction<ImageType[]>>;
  setPostImage: (value: string) => void;
};

export const ImagesCollection: React.FC<Props> = ({ loadedImages, setLoadedImages, setPostImage }) => {
  useEffect(() => {
    if (!loadedImages.length) {
      setPostImage("");
    }
  }, [loadedImages.length]);

  const onDeleteImageFromCollection = (id: string) => {
    const newCollection = loadedImages.filter((item) => item.id !== id);
    setLoadedImages(newCollection);

    if (loadedImages.length === 0) {
      setPostImage("");
    }
  };

  return (
    <div className={s.collection__container}>
      <Image
        src={"/img/create-post/plus.svg"}
        alt={"plus"}
        height={36}
        width={36}
        className={s.collection__plusBtn}
        onClick={() => setPostImage("")}
      />
      <div className={s.collection__items}>
        {loadedImages.map((item, index) => {
          return (
            <div key={index} className={s.collection__item} onClick={() => setPostImage(item.image)}>
              <Image
                src={item.image}
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
                onClick={() => onDeleteImageFromCollection(item.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
