import React, { useRef, useState } from "react";
import s from "./CreatePost.module.scss";
import Image from "next/image";
import { FiltersModal } from "@/components/Modals/FiltersModal";
import { filters } from "@/features/data";
import { AreYouSureModal } from "@/components/Modals/AreYouSureModal";
import { AspectRatioType, ImageType } from "./CreatePost";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Props = {
  showSecondModal: () => void;
  showFourthModal: () => void;
  aspectRatio: AspectRatioType;
  setActiveFilter: (value: string) => void;
  activeFilter: string;
  zoomValue: string;
  file: File;
  setShowCreatePostModal: (value: boolean) => void;
  croppedPostImage: string;
  loadedImages: ImageType[];
};

export const ThirdModal: React.FC<Props> = ({
  loadedImages,
  showSecondModal,
  showFourthModal,
  aspectRatio,
  setActiveFilter,
  activeFilter,
  zoomValue,
  file,
  setShowCreatePostModal,
  croppedPostImage,
}) => {
  const [areYouSureModal, setAreYouSureModal] = useState(false);

  const changedPostImage = useRef<any>();

  const onActiveFilter = (filter: string) => {
    switch (filter) {
      case "Normal":
        setActiveFilter("none");
        break;
      case "Kyoto":
        setActiveFilter("saturate(3)");
        break;
      case "Lark":
        setActiveFilter("grayscale(100%)");
        break;
      case "Gingham":
        setActiveFilter("contrast(160%)");
        break;
      case "Moon":
        setActiveFilter("brightness(0.25)");
        break;
      case "Clarendon":
        setActiveFilter("invert(100%)");
        break;
      case "Juno":
        setActiveFilter("sepia(100%)");
        break;
      case "Retro": {
        setActiveFilter("opacity(50%)");
        break;
      }
      case "Paris": {
        setActiveFilter("hue-rotate(180deg)");
        break;
      }
      default: {
        setActiveFilter("");
        break;
      }
    }
  };

  const slides = Array.from({ length: 1000 }).map((el, index) => `Slide ${index + 1}`);

  return (
    <>
      <FiltersModal
        title={"Filters"}
        width={"972px"}
        buttonName={"Next"}
        showSecondModal={showSecondModal}
        showFourthModal={showFourthModal}
        file={file}
        onClose={() => setAreYouSureModal(true)}
        changedPostImage={changedPostImage}
        activeFilter={activeFilter}
        zoomValue={zoomValue}
        aspectRatio={aspectRatio}
      >
        <div className={s.cropping__filters}>
          <div className={s.cropping__filters__wrapper}>
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              className={"w-full"}
            >
              {loadedImages.map((i) => {
                return (
                  <SwiperSlide key={i.image} className={"w-full"}>
                    {/*<img src={i.image} alt="alt" style={{ filter: activeFilter }} />*/}
                    <Image
                      // src={`${croppedPostImage ? croppedPostImage : "/img/create-post/filters-modal/image.png"}`}
                      src={i.image}
                      alt={"image"}
                      width={490}
                      height={503}
                      style={{ filter: activeFilter, margin: "auto" }}
                      className={s.cropping__filters__image}
                      ref={changedPostImage}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className={s.cropping__filters__items}>
            {filters.map((item, index) => {
              return (
                <div key={index} className={s.cropping__filters__item} onClick={() => onActiveFilter(item.name)}>
                  <Image
                    src={`${croppedPostImage ? croppedPostImage : "/img/create-post/filters-modal/image-filter.png"}`}
                    alt={"image-filter"}
                    width={108}
                    height={108}
                    style={{ filter: item.filter }}
                    className={s.cropping__filters__smallImage}
                  />
                  <p>{item.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </FiltersModal>
      {areYouSureModal && (
        <AreYouSureModal toggleAreYouSureModal={setAreYouSureModal} toggleModal={setShowCreatePostModal} />
      )}
    </>
  );
};
