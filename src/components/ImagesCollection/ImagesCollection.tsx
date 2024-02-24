import React, { Dispatch, SetStateAction, useEffect } from 'react';
import Image from 'next/image';
import { ImageStateType } from '@/app/(authorized)/CreatePost/CreatePost';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { postActions } from '@/redux/reducers/post/postReducer';
import { toast } from 'react-toastify';

import s from './ImagesCollection.module.scss';
import clsx from 'clsx';

type Props = {
  loadedImages: ImageStateType[];
  setLoadedImages: Dispatch<SetStateAction<ImageStateType[]>>;
  setStep: Dispatch<SetStateAction<number>>;
};

export const ImagesCollection = ({ loadedImages, setStep }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loadedImages.length) {
      setStep(1);
    }
  }, [loadedImages.length]);
  const moreThen10Img = loadedImages.length >= 10;
  const onDeleteImageFromCollection = (id: string) => {
    if (loadedImages.length === 1) {
      toast.error("Your can't delete one image");
      return;
    } else {
      dispatch(postActions.removeGalleryImage({ id }));
    }
  };
  return (
    <div className={s.collection__container}>
      <div className={s.collection__items}>
        {loadedImages.map((item, index) => {
          return (
            <div
              key={index}
              className={s.collection__item}
              onClick={() => console.log(item.image)} //we can change current item here
            >
              <Image
                src={item.image}
                alt={'image-collection'}
                height={82}
                width={80}
                className={s.collection__image__collection}
              />
              <Image
                src={'/img/create-post/close.svg'}
                alt={'close'}
                width={12}
                height={12}
                className={s.collection__close}
                onClick={() => onDeleteImageFromCollection(item.id)}
              />
            </div>
          );
        })}
        <Image
          src={
            moreThen10Img
              ? '/img/create-post/plus-disable.svg'
              : '/img/create-post/plus.svg'
          }
          alt={'plus'}
          height={36}
          width={36}
          className={clsx(s.collection__plusBtn)}
          onClick={() => !moreThen10Img && setStep(1)}
        />
      </div>
    </div>
  );
};
