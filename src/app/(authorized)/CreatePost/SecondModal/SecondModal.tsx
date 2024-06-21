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
import { AspectRatioType } from '@/app/(authorized)/CreatePost/CreatePost';

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  setShowCreatePostModal: (value: boolean) => void;
  onSaveDraft: () => void;
};

export const SecondModal = ({ setStep, setShowCreatePostModal, onSaveDraft }: Props) => {
  const dispatch = useAppDispatch();

  const currentImageId = useAppSelector((state) => state.post.currentImageId);
  const currentImage = useAppSelector((state) =>
    state.post.changedImages.filter((el) => el.id === currentImageId)[0]
  );

  const [areYouSureModal, setAreYouSureModal] = useState(false);

  const onZoomImage = (value: number) => {
    if (currentImageId)
      dispatch(postActions.setZoom({ id: currentImageId, zoom: value }));
  };

  if (!currentImageId) {
    return null;
  }

  return (
    <div className={s.cropping__wrapper}>
      <CroppingModal setStep={setStep} onClose={() => setAreYouSureModal(true)}>
        <PostCropper
          zoom={currentImage.zoom}
          aspectRatio={currentImage.aspectRatio ?? AspectRatioType.one}
          currentImageId={currentImageId}
        />
        <div className={s.itemsContainer}>
          <div className={s.leftItems}>
            <AspectRatio imageId={currentImageId} />
            <Range onValueChange={onZoomImage} value={currentImage.zoom} />
          </div>
          <Gallery setStep={setStep} />
        </div>
      </CroppingModal>
      {areYouSureModal && (
        <AreYouSureModal
          toggleAreYouSureModal={setAreYouSureModal}
          toggleModal={setShowCreatePostModal}
          type={'cancelCreating'}
          onNo={onSaveDraft}
        />
      )}
    </div>
  );
};
