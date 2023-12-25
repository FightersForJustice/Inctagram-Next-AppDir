import React, { Dispatch, SetStateAction, useEffect } from 'react';
import s from './ImagesCollection.module.scss';
import Image from 'next/image';
import { ImageStateType } from '@/app/(locale)/my-profile/CreatePost/CreatePost';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { postActions } from '@/redux/reducers/post/postReducer';
import { toast } from 'react-toastify';

type Props = {
  loadedImages: ImageStateType[];
  setLoadedImages: Dispatch<SetStateAction<ImageStateType[]>>;
  setPostImage: (value: string) => void;
};

export const ImagesCollection: React.FC<Props> = ({
  loadedImages,
  setPostImage,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loadedImages.length) {
      setPostImage('');
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
      <Image
        src={
          moreThen10Img
            ? '/img/create-post/plus-disable.svg'
            : '/img/create-post/plus.svg'
        }
        alt={'plus'}
        height={36}
        width={36}
        className={s.collection__plusBtn}
        onClick={() => !moreThen10Img && setPostImage('')}
      />
      <div className={s.collection__items}>
        {loadedImages.map((item, index) => {
          return (
            <div
              key={index}
              className={s.collection__item}
              onClick={() => setPostImage(item.image)}
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
      </div>
    </div>
  );
};
