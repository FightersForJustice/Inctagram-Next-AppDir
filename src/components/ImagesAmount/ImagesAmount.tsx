import React from 'react';
import s from './ImagesAmount.module.scss';
import Image from 'next/image';

type Props = {
  imagesLength: number;
};

export const ImagesAmount: React.FC<Props> = ({ imagesLength }) => {
  const imgAmount = imagesLength > 1 ? imagesLength : '';
  return (
    <div className={s.imgAmount}>
      <Image
        src={'/img/create-post/icons/icon3.svg'}
        alt={''}
        width={'20'}
        height={'20'}
      />
      <span>{imgAmount}</span>
    </div>
  );
};
