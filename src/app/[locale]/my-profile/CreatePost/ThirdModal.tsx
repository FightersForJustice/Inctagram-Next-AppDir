import React from "react";
import s from "./CreatePost.module.scss";
import Image from "next/image";
import { FiltersModal } from "../../../../components/FiltersModal/FiltersModal";

const filters = [
  {
    name: "Normal",
    filter: "none",
  },
  {
    name: "Kyoto",
    filter: "saturate(3)",
  },
  {
    name: "Lark",
    filter: "grayscale(100%)",
  },
  {
    name: "Gingham",
    filter: "contrast(160%)",
  },
  {
    name: "Moon",
    filter: "brightness(0.5)",
  },
  {
    name: "Clarendon",
    filter: "invert(80%)",
  },
  {
    name: "Juno",
    filter: "sepia(80%)",
  },
  {
    name: "Retro",
    filter: "opacity(70%)",
  },
  {
    name: "Paris",
    filter: "hue-rotate(150deg)",
  },
];

type Props = {
  postImage: string;
  showSecondModal: () => void;
  showFourthModal: () => void;
  aspectRatio: "" | "1:1" | "4:5" | "16:9";
  setActiveFilter: (value: string) => void;
  activeFilter: string;
  zoomValue: string;
};

const ThirdModal: React.FC<Props> = ({
  postImage,
  showSecondModal,
  showFourthModal,
  aspectRatio,
  setActiveFilter,
  activeFilter,
  zoomValue,
}) => {
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

  return (
    <FiltersModal
      title={"Filters"}
      width={"972px"}
      buttonName={"Next"}
      showSecondModal={showSecondModal}
      showFourthModal={showFourthModal}
    >
      <div className={s.cropping__filters}>
        <div className={s.cropping__filters__wrapper}>
          <Image
            src={`${postImage ? postImage : "/img/create-post/filters-modal/image.png"}`}
            alt={"image"}
            width={490}
            height={503}
            style={{
              aspectRatio: aspectRatio.replace(":", "/"),
              filter: activeFilter,
              transform: `scale(${+zoomValue / 10})`,
            }}
            className={s.cropping__filters__image}
          />
        </div>
        <div className={s.cropping__filters__items}>
          {filters.map((item, index) => {
            return (
              <div key={index} className={s.cropping__filters__item} onClick={() => onActiveFilter(item.name)}>
                <Image
                  src={`${postImage ? postImage : "/img/create-post/filters-modal/image-filter.png"}`}
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
  );
};

export default ThirdModal;
