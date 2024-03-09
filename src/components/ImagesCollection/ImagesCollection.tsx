import { ImageStateType } from '@/app/(authorized)/CreatePost/CreatePost';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { postActions } from '@/redux/reducers/post/postReducer';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useAppSelector } from '@/redux/hooks/useSelect';
import { postImages } from '@/redux/reducers/post/postSelectors';
import clsx from 'clsx';
import s from './ImagesCollection.module.scss';

type Props = {
  images: ImageStateType[];
  setImages?: Dispatch<SetStateAction<ImageStateType[]>>;
  setStep: Dispatch<SetStateAction<number>>;
  closeGallery: () => void;
  changeCurrentImage?: Dispatch<SetStateAction<ImageStateType>>;
};

export const ImagesCollection = ({
  setStep,
  closeGallery, // changeCurrentImage,
}: Props) => {
  const dispatch = useAppDispatch();
  const images = useAppSelector(postImages);

  console.log('images gallery changed', images);
  useEffect(() => {
    if (!images.length) {
      setStep(1);
    }
  }, [images.length]);

  const moreThen10Img = images.length >= 10;

  const changeCurrentImage = (image: ImageStateType) => {
    dispatch(postActions.changeCurrentImage(image));
  };
  const onDeleteImageFromCollection = (id: string) => {
    if (images.length === 1) {
      toast.error("Your can't delete one image");
      return;
    } else {
      dispatch(postActions.removeGalleryImage({ id }));
    }
  };
  const onChangeCurrentImage = (item: ImageStateType) => {
    closeGallery();

    changeCurrentImage(item);
  };
  return (
    <div className={s.collection__container}>
      <div className={s.collection__items}>
        {images.map((item, index) => {
          return (
            <div
              key={index}
              className={s.collection__item}
              onClick={() => onChangeCurrentImage(item)} //we can change current item here
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
