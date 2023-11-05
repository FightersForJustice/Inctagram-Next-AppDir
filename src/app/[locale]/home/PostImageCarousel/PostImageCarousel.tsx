import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './PostImageCarousel.css';
import { ImageType } from '@/api/posts.api';
import React from 'react';

type Props = {
  images: ImageType[];
};

export const PostImageCarousel: React.FC<Props> = ({ images }) => {
  if (images.length === 0) {
    return (
      <Image
        src={'/img/create-post/no-image.png'}
        alt={'post'}
        width={491}
        height={491}
      />
    );
  }

  const sliderImages = images.map((image, index) => {
    if (image.height > 360) {
      return (
        <SwiperSlide key={index}>
          <Image
            src={`${image.url ? image.url : '/img/create-post/no-image.png'}`}
            alt={'post'}
            width={491}
            height={491}
          />
        </SwiperSlide>
      );
    }
  });

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      width={491}
      height={491}
      navigation
      pagination={{ clickable: true }}
    >
      {sliderImages}
    </Swiper>
  );
};
