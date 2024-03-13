import Image from 'next/image';
import { Dispatch, SetStateAction, useRef, useState } from 'react';

import { FiltersModal } from '@/components/Modals/FiltersModal';
import { AreYouSureModal } from '@/components/Modals/AreYouSureModal';
import { useAppSelector } from '@/redux/hooks/useSelect';
import { filters } from '@/features/data';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { postActions } from '@/redux/reducers/post/postReducer';
import { useTranslation } from 'react-i18next';

import s from './CreatePost.module.scss';
import { Carousel } from '@/components/Carousel/Carousel';
import { changedImageById } from '@/redux/reducers/post/postSelectors';

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  zoomValue?: string;
  setShowCreatePostModal: (value: boolean) => void;
};

export const ThirdModal = ({
  setStep,
  zoomValue,
  setShowCreatePostModal,
}: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const translate = (key: string): string =>
    t(`SettingsProfilePage.AddPhotoModal.${key}`);
  const [areYouSureModal, setAreYouSureModal] = useState(false);
  const currentImageId = useAppSelector((state) => state.post.currentImageId);
  const images = useAppSelector((state) => state.post.changedImages);
  const imageById = images[0]
  const changedPostImage = useRef<any>();

  const setActiveImage = (id: string) => {
    dispatch(postActions.changeCurrentImage({ id }));
  };

  if (!imageById) {
    return null;
  }

  return (
    <>
      <FiltersModal
        title={translate('filters')}
        buttonName="Next"
        setStep={setStep}
        onClose={() => setAreYouSureModal(true)}
        zoomValue={zoomValue}
        changedPostImage={changedPostImage}
      >
        <div className={s.cropping__filters}>
          <div className={s.cropping__filters__wrapper}>
            <Carousel loadedImages={images} setActive={setActiveImage} />
          </div>
          <div className={s.cropping__filters__items}>
            {filters.map(({ name, filter }) => {
              const onSelectFilter = (filter: string) => {
                dispatch(
                  postActions.setImageFilter({
                    image: imageById.image,
                    filter,
                    id: imageById.id,
                  })
                );
              };
              return (
                <div
                  key={name}
                  className={s.cropping__filters__item}
                  onClick={() => onSelectFilter(filter)}
                >
                  <Image
                    //@ts-ignore
                    src={
                      images.find((image) => image.id === currentImageId)?.image
                    }
                    alt={'image-filter'}
                    width={108}
                    height={108}
                    style={{ filter }}
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
        <AreYouSureModal
          toggleAreYouSureModal={setAreYouSureModal}
          toggleModal={setShowCreatePostModal}
        />
      )}
    </>
  );
};
