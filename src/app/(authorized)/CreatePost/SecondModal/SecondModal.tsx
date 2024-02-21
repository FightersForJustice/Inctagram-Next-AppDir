import { Dispatch, SetStateAction, useState } from 'react';

import { CroppingModal } from '@/components/Modals/CroppingModal';
import { AspectRatio } from './AspectRatio';
import { Range } from './Range/Range';
import { Gallery } from './Gallery';
import { AreYouSureModal } from '@/components/Modals/AreYouSureModal';
import { AspectRatioType, ImageStateType } from '../CreatePost';
import { PostCropper } from '../PostCropper/PostCropper';
import { useAppSelector } from '@/redux/hooks/useSelect';
import { imagesGallery } from '@/redux/reducers/post/postSelectors';
import { useDebouncedCallback } from 'use-debounce';

import s from '../CreatePost.module.scss';

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  postImage: ImageStateType;
  setPostImage: (value: string) => void;
  aspectRatio: AspectRatioType;
  setZoomValue: (value: string) => void;
  zoomValue: string;
  setShowCreatePostModal: (value: boolean) => void;
  setLoadedImages: (value: any) => void;
  setCroppedPostImage: (value: string) => void;
  croppedPostImage: string;
};

export const SecondModal = ({
  setStep,
  postImage,
  setPostImage,
  aspectRatio,
  setZoomValue,
  zoomValue,
  setShowCreatePostModal,
  setLoadedImages,
  setCroppedPostImage,
  croppedPostImage,
}: Props) => {
  const [areYouSureModal, setAreYouSureModal] = useState(false);
  const imagesGalleryImages = useAppSelector(imagesGallery);
  const onZoomImage = useDebouncedCallback((value: string) => {
    setZoomValue(value);
  }, 300);

  return (
    <div className={s.cropping__wrapper}>
      <CroppingModal
        setPostImage={setPostImage}
        setStep={setStep}
        onClose={() => setAreYouSureModal(true)}
        croppedPostImage={croppedPostImage}
        width={'492px'}
      >
        <AspectRatio />
        <Range onZoomImage={onZoomImage} zoomImage={zoomValue} />
        <Gallery
          setLoadedImages={setLoadedImages}
          setPostImage={setPostImage}
        />

        <PostCropper
          postImage={postImage}
          aspectRatio={aspectRatio}
          zoomValue={zoomValue}
          setCroppedPostImage={setCroppedPostImage}
          loadedImages={imagesGalleryImages}
          setLoadedImages={setLoadedImages}
        />
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
