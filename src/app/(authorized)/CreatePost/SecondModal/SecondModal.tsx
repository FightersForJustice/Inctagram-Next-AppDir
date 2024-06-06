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
};

export const SecondModal = ({ setStep, setShowCreatePostModal }: Props) => {
  const [areYouSureModal, setAreYouSureModal] = useState(false);
  const currentImageId = useAppSelector((state) => state.post.currentImageId);
  const zoom = useAppSelector((state) =>
    state.post.changedImages.filter((el) => el.id === currentImageId)
  );
  const dispatch = useAppDispatch();
  const aspectRatio = useAppSelector((state) =>
    state.post.changedImages.filter((el) => el.id === currentImageId)
  );
  const onZoomImage = (value: number) => {
    if (currentImageId)
      dispatch(postActions.setZoom({ id: currentImageId, zoom: value }));
  };

  if (!currentImageId) {
    return null;
  }
  const onCloseCropping = (value: boolean) => {
    setAreYouSureModal(value);
    setStep((prevState) => prevState - 1);
  };

  return (
    <div className={s.cropping__wrapper}>
      <CroppingModal setStep={setStep} onClose={() => setAreYouSureModal(true)}>
        <PostCropper
          zoom={zoom[0].zoom}
          aspectRatio={aspectRatio[0].aspectRatio ?? AspectRatioType.one}
          currentImageId={currentImageId}
        />
        <div className={s.itemsContainer}>
          <div className={s.leftItems}>
            <AspectRatio imageId={currentImageId} />
            <Range onValueChange={onZoomImage} value={zoom[0].zoom} />
          </div>
          <Gallery setStep={setStep} />
        </div>
      </CroppingModal>
      {areYouSureModal && (
        <AreYouSureModal
          toggleAreYouSureModal={setAreYouSureModal}
          toggleModal={onCloseCropping}
          type={'cancelCreating'}
        />
      )}
    </div>
  );
};
