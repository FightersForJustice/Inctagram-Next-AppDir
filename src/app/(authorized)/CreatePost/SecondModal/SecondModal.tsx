import { Dispatch, SetStateAction, useState } from 'react';

import { AreYouSureModal } from '@/components/Modals/AreYouSureModal';
import { CroppingModal } from '@/components/Modals/CroppingModal';
import { useAppSelector } from '@/redux/hooks/useSelect';
import { imagesGallery } from '@/redux/reducers/post/postSelectors';
import { AspectRatioType, ImageStateType } from '../CreatePost';
import { PostCropper } from '../PostCropper/PostCropper';
import { AspectRatio } from './AspectRatio';
import { Gallery } from './Gallery';
import { Range } from './Range/Range';

import s from '../CreatePost.module.scss';

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  currentImage: ImageStateType;
  aspectRatio: AspectRatioType;
  setZoomValue: (value: string) => void;
  zoomValue: string;
  setShowCreatePostModal: (value: boolean) => void;
  setCroppedPostImage: (value: string) => void;
  croppedPostImage: string;
};

export const SecondModal = ({
  setStep,
  currentImage,
  aspectRatio,
  setZoomValue,
  zoomValue,
  setShowCreatePostModal,
  setCroppedPostImage,
  croppedPostImage,
}: Props) => {
  const [areYouSureModal, setAreYouSureModal] = useState(false);
  const imagesGalleryImages = useAppSelector(imagesGallery);
  const onZoomImage = (value: string) => {
    setZoomValue(value);
  };

  return (
    <div className={s.cropping__wrapper}>
      <CroppingModal
        setStep={setStep}
        onClose={() => setAreYouSureModal(true)}
        croppedPostImage={croppedPostImage}
      >
        <PostCropper
          postImage={currentImage}
          aspectRatio={aspectRatio}
          zoomValue={zoomValue}
          setCroppedPostImage={setCroppedPostImage}
        />
        <div className={s.itemsContainer}>
          <div className={s.leftItems}>
            <AspectRatio />
            <Range onZoomImage={onZoomImage} zoomImage={zoomValue} />
          </div>
          <Gallery setStep={setStep} setLoadedImages={setLoadedImages} />
        </div>
      </CroppingModal>
      {areYouSureModal && (
        <AreYouSureModal
          toggleAreYouSureModal={setAreYouSureModal}
          toggleModal={setShowCreatePostModal}
        />
      )}
    </div>
  );
};
