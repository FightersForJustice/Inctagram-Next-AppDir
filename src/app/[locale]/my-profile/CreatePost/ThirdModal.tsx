import React, { useRef, useState } from "react";
import s from "./CreatePost.module.scss";
import Image from "next/image";
import { FiltersModal } from "@/components/Modals/FiltersModal";
import { filters } from "@/features/data";
import { AreYouSureModal } from "@/components/Modals/AreYouSureModal";
import { AspectRatioType, ImageType } from "./CreatePost";
import { SwiperSlide } from "swiper/react";

import { Carousel } from "@/components/Carousel/Carousel";
import { useAppSelector } from "@/redux/hooks/useSelect";
import { postImages } from "@/redux/reducers/post/postSelectors";

type Props = {
  showSecondModal: () => void;
  showFourthModal: () => void;
  aspectRatio: AspectRatioType;
  setActiveFilter: (value: string) => void;
  activeFilter: string;
  zoomValue: string;
  file: File[];
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
  const imagesArr = useAppSelector(postImages);
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

  // const slides = Array.from({ length: 1000 }).map((el, index) => `Slide ${index + 1}`);

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
        activeFilter={activeFilter}
        zoomValue={zoomValue}
        aspectRatio={aspectRatio}
        changedPostImage={changedPostImage}
      >
        <div className={s.cropping__filters}>
          <div className={s.cropping__filters__wrapper}>
            <Carousel>
              {imagesArr.map((i, index) => {
                return (
                  <SwiperSlide key={i.id} className={"w-full"}>
                    <Image
                      id={i.id}
                      src={`${i.image ? i.image : "/img/create-post/filters-modal/image.png"}`}
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
            </Carousel>
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
                    ref={changedPostImage}
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
