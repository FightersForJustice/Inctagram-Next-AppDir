import React, { useRef, useState } from "react";
import s from "./CreatePost.module.scss";
import Image from "next/image";
import { FiltersModal } from "@/components/Modals/FiltersModal";
import { AreYouSureModal } from "@/components/Modals/AreYouSureModal";
import { AspectRatioType } from "./CreatePost";
import { Carousel } from "@/components/Carousel/Carousel";
import { useAppSelector } from "@/redux/hooks/useSelect";
import { postImages } from "@/redux/reducers/post/postSelectors";
import { filters } from "@/features/data";
import { useAppDispatch } from "@/redux/hooks/useDispatch";
import { postActions } from "@/redux/reducers/post/postReducer";

type Props = {
  showSecondModal: () => void;
  showFourthModal: () => void;
  aspectRatio: AspectRatioType;
  zoomValue: string;
  setShowCreatePostModal: (value: boolean) => void;
};

export const ThirdModal: React.FC<Props> = ({
  showSecondModal,
  showFourthModal,
  aspectRatio,
  zoomValue,
  setShowCreatePostModal,
}) => {
  const [areYouSureModal, setAreYouSureModal] = useState(false);
  const imagesArr = useAppSelector(postImages);
  const changedPostImage = useRef<any>();
  const dispatch = useAppDispatch();
  const [activeImage, setActiveImage] = useState<string>(imagesArr[0].image);

  const onSetActiveHandle = (image: string) => {
    setActiveImage(image);
  };

  return (
    <>
      <FiltersModal
        title={"Filters"}
        width={"972px"}
        buttonName={"Next"}
        showSecondModal={showSecondModal}
        showFourthModal={showFourthModal}
        onClose={() => setAreYouSureModal(true)}
        zoomValue={zoomValue}
        aspectRatio={aspectRatio}
        changedPostImage={changedPostImage}
      >
        <div className={s.cropping__filters}>
          <div className={s.cropping__filters__wrapper}>
            <Carousel loadedImages={imagesArr} setActive={onSetActiveHandle} />
          </div>
          <div className={s.cropping__filters__items}>
            {filters.map(({ name, filter }) => {
              const onSelectFilter = (filter: string) => {
                dispatch(postActions.setImageFilter({ image: activeImage, filter }));
              };
              return (
                <div key={name} className={s.cropping__filters__item} onClick={() => onSelectFilter(filter)}>
                  <Image
                    src={activeImage}
                    alt={"image-filter"}
                    width={108}
                    height={108}
                    style={{ filter, marginRight: "10px" }}
                    className={s.cropping__filters__smallImage}
                    ref={changedPostImage}
                  />
                  <p>{name}</p>
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
