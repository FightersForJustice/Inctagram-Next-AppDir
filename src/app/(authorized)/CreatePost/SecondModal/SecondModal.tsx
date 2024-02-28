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
  const currentImage = useAppSelector((state) => state.post.currentImage);

  const images = useAppSelector(imagesGallery);

  console.log('second modal render');
  console.log(images);
  const onZoomImage = (value: string) => {
    setZoomValue(value);
  };

  return (
    <div className={s.cropping__wrapper}>
      <CroppingModal setStep={setStep} onClose={() => setAreYouSureModal(true)}>
        <PostCropper
          postImage={currentImage}
          aspectRatio={aspectRatio}
          zoomValue={zoomValue}
        />
        <div className={s.itemsContainer}>
          <div className={s.leftItems}>
            <AspectRatio />
            <Range onZoomImage={onZoomImage} zoomImage={zoomValue} />
          </div>
          <Gallery
            images={images}
            setStep={setStep}
            currentImage={currentImage!}
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
