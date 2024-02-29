import { Dispatch, SetStateAction, useState } from 'react';

import { AreYouSureModal } from '@/components/Modals/AreYouSureModal';
import { CroppingModal } from '@/components/Modals/CroppingModal';
import { PostCropper } from '../PostCropper/PostCropper';
import { AspectRatio } from './AspectRatio';
import { Gallery } from './Gallery';
import { Range } from './Range/Range';

import { useAppSelector } from '@/redux/hooks/useSelect';
import { imagesGallery } from '@/redux/reducers/post/postSelectors';
import s from '../CreatePost.module.scss';

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  setShowCreatePostModal: (value: boolean) => void;
};

export const SecondModal = ({ setStep, setShowCreatePostModal }: Props) => {
  const [areYouSureModal, setAreYouSureModal] = useState(false);
  const [zoomValue, setZoomValue] = useState('0');

  const aspectRatio = useAppSelector((state) => state.post.cropAspectRatio);

  const images = useAppSelector(imagesGallery);

  // const [currentImage, setCurrentImage] = useState(images[images.length - 1]);

  const onZoomImage = (value: string) => {
    setZoomValue(value);
  };

  return (
    <div className={s.cropping__wrapper}>
      <CroppingModal setStep={setStep} onClose={() => setAreYouSureModal(true)}>
        <PostCropper
          aspectRatio={aspectRatio}
          zoomValue={zoomValue}
          // currentImage={currentImage}
        />
        <div className={s.itemsContainer}>
          <div className={s.leftItems}>
            <AspectRatio />
            <Range onZoomImage={onZoomImage} zoomImage={zoomValue} />
          </div>
          <Gallery
            images={images}
            // changeCurrentImage={setCurrentImage}
            setStep={setStep}
          />
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
