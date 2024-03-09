import Image from 'next/image';
import { FC, ReactNode } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './carousel.scss';
import { ChangedImage } from '@/redux/reducers/post/postReducer';

interface SlidesStyles {
  width: number;
  height: number;
  className: string;
}

interface IProps {
  children?: ReactNode;
  loadedImages?: Omit<ChangedImage, 'croppedArea'>[];
  slidesStyles?: SlidesStyles;
  ref?: any;
  setActive?: (id: string) => void;
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
      className="carousel__wrapper"
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
                  if (isActive && setActive) {
                    console.log(id);
                    setActive(id);
                  }
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
