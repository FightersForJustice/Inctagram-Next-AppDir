import React, { FC, ReactNode } from 'react';
import { Swiper } from 'swiper/react';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ImageStateType } from '@/app/(authorized)/my-profile/CreatePost/CreatePost';
import { SwiperSlide } from 'swiper/react';
import Image from 'next/image';

interface SlidesStyles {
  width: number;
  height: number;
  className: string;
}

interface IProps {
  children?: ReactNode;
  loadedImages?: ImageStateType[];
  slidesStyles?: SlidesStyles;
  ref?: any;
  setActive?: (value: string) => void;
}

export const Carousel: FC<IProps> = ({
  children,
  loadedImages,
  slidesStyles,
  setActive,
  ref,
}) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      {loadedImages
        ? loadedImages.map(({ image, id, filter }) => {
            return (
              <SwiperSlide key={id} className={'w-full'}>
                {({ isActive }) => {
                  if (isActive && setActive) setActive(image);
                  return (
                    <Image
                      src={image}
                      alt={'image'}
                      width={slidesStyles?.width || 490}
                      height={slidesStyles?.height || 503}
                      className={slidesStyles?.className}
                      style={{ filter, margin: '0 auto' }}
                      ref={ref}
                    />
                  );
                }}
              </SwiperSlide>
            );
          })
        : children}
    </Swiper>
  );
};
