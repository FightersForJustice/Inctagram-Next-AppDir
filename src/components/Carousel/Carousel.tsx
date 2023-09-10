import React, { ReactNode } from "react";
import { Swiper } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ImageType } from "@/app/[locale]/my-profile/CreatePost/CreatePost";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";

//можно передать либо массив с изображениями типа ImageType[]
// (пропс с названием loadedImages) и он отрисует все фотки из массива
// как слайды с навигацией(стрелочками) и точками с низу либо передавать сразу слайды
// компонентой swiper SwiperSlide дока тут https://swiperjs.com/react
interface SlidesStyles {
  width: number;
  height: number;
  className: string;
}

export const Carousel = ({
  children,
  loadedImages,
  slidesStyles,
  ref,
}: {
  children?: ReactNode;
  loadedImages?: ImageType[];
  slidesStyles?: SlidesStyles;
  ref?: any;
}) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      // className={"w-full text-white"}
    >
      {loadedImages
        ? loadedImages.map((i) => {
            return (
              <SwiperSlide key={i.id} className={"w-full"}>
                <Image
                  src={i.image}
                  alt={"image"}
                  width={slidesStyles?.width ?? 490}
                  height={slidesStyles?.height ?? 503}
                  className={slidesStyles?.className}
                  ref={ref}
                />
              </SwiperSlide>
            );
          })
        : children}
    </Swiper>
  );
};
