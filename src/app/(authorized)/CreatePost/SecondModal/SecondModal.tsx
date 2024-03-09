import { Dispatch, SetStateAction, useState } from 'react';

import { AreYouSureModal } from '@/components/Modals/AreYouSureModal';
import { CroppingModal } from '@/components/Modals/CroppingModal';
import { PostCropper } from '../PostCropper/PostCropper';
import { AspectRatio } from './AspectRatio';
import { Gallery } from './Gallery';
import { Range } from './Range/Range';

import { useAppSelector } from '@/redux/hooks/useSelect';
import s from '../CreatePost.module.scss';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { postActions } from '@/redux/reducers/post/postReducer';

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  setShowCreatePostModal: (value: boolean) => void;
};

export const SecondModal = ({ setStep, setShowCreatePostModal }: Props) => {
  const [areYouSureModal, setAreYouSureModal] = useState(false);
  const currentImageId = useAppSelector((state) => state.post.currentImageId);
  const zoom = useAppSelector((state) => state.post.zoom);
  const dispatch = useAppDispatch();
  const aspectRatio = useAppSelector((state) => state.post.aspectRatio);

  const onZoomImage = (value: number) => {
    dispatch(postActions.setZoom(value));
  };

  if (!currentImageId) {
    return null;
  }

  return (
    <div className={s.cropping__wrapper}>
      <CroppingModal setStep={setStep} onClose={() => setAreYouSureModal(true)}>
        <PostCropper
          zoom={zoom}
          aspectRatio={aspectRatio}
          currentImageId={currentImageId}
        />
        <div className={s.itemsContainer}>
          <div className={s.leftItems}>
            <AspectRatio />
            <Range onValueChange={onZoomImage} value={zoom} />
          </div>
          <Gallery setStep={setStep} />
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
