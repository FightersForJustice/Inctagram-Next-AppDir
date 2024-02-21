import Image from 'next/image';
import { Dispatch, SetStateAction, useRef, useState } from 'react';

import { FiltersModal } from '@/components/Modals/FiltersModal';
import { AreYouSureModal } from '@/components/Modals/AreYouSureModal';
import { Carousel } from '@/components/Carousel/Carousel';
import { useAppSelector } from '@/redux/hooks/useSelect';
import { postImages } from '@/redux/reducers/post/postSelectors';
import { filters } from '@/features/data';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { postActions } from '@/redux/reducers/post/postReducer';
import { useTranslation } from 'react-i18next';

import s from './CreatePost.module.scss';

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  zoomValue: string;
  setShowCreatePostModal: (value: boolean) => void;
};

export const ThirdModal = ({
  setStep,
  zoomValue,
  setShowCreatePostModal,
}: Props) => {
  const { t } = useTranslation();
  const translate = (key: string): string =>
    t(`SettingsProfilePage.AddPhotoModal.${key}`);

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
        title={translate('filters')}
        width={'972px'}
        buttonName="Next"
        setStep={setStep}
        onClose={() => setAreYouSureModal(true)}
        zoomValue={zoomValue}
        changedPostImage={changedPostImage}
      >
        <div className={s.cropping__filters}>
          <div className={s.cropping__filters__wrapper}>
            <Carousel loadedImages={imagesArr} setActive={onSetActiveHandle} />
          </div>
          <div className={s.cropping__filters__items}>
            {filters.map(({ name, filter }) => {
              const onSelectFilter = (filter: string) => {
                dispatch(
                  postActions.setImageFilter({ image: activeImage, filter })
                );
              };
              return (
                <div
                  key={name}
                  className={s.cropping__filters__item}
                  onClick={() => onSelectFilter(filter)}
                >
                  <Image
                    src={activeImage}
                    alt={'image-filter'}
                    width={108}
                    height={108}
                    style={{ filter, marginRight: '10px' }}
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
