import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { AreYouSureModal } from '@/components/Modals/AreYouSureModal';
import { CroppingModal } from '@/components/Modals/CroppingModal';
import { changedImages } from 'src/redux/reducers/post/postSelectors';
import { PostCropper } from '../../../../components/PostCropper/PostCropper';

import { useAppSelector } from '@/redux/hooks/useSelect';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { postActions } from '@/redux/reducers/post/postReducer';
import { AspectRatioType } from '@/app/(authorized)/CreatePost/CreatePost';
import { AspectRatio } from '@/components/CropperControls/AspectRatio';
import { Range } from '@/components/CropperControls/Range';
import { Gallery } from '@/components/CropperControls/Gallery';
import s from '../CreatePost.module.scss';

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  setShowCreatePostModal: (value: boolean) => void;
  onSaveDraft: () => void;
};

export const SecondModal = ({
  setStep,
  setShowCreatePostModal,
  onSaveDraft,
}: Props) => {
  const dispatch = useAppDispatch();
  const [deleteImageId, setDeleteImageId] = useState('');
  const [isDelete, setDelete] = useState(false);
  const images = useAppSelector(changedImages);
  const currentImageId = useAppSelector((state) => state.post.currentImageId);
  const currentImageIndex = images.indexOf(
    images.filter((el) => (el.id === currentImageId ? el : ''))[0]
  );
  const currentImage = images.filter((el) => el.id === currentImageId)[0];

  const [areYouSureModal, setAreYouSureModal] = useState(false);

  const changeCurrentImage = (imageId: string) => {
    dispatch(postActions.changeCurrentImage({ id: imageId }));
  };
  const deleteImage = (imageId: string) => {
    setDelete(true);
    setDeleteImageId(imageId);
  };

  const onZoomImage = (value: number) => {
    if (currentImageId)
      dispatch(postActions.setZoom({ id: currentImageId, zoom: value }));
  };

  const onPrevImage = () => {
    const id = images[currentImageIndex - 1].id;
    changeCurrentImage(id);
  };

  const onNextImage = () => {
    const id = images[currentImageIndex + 1].id;
    changeCurrentImage(id);
  };

  const sliderIsView = images.length > 1;
  const viewPrevBtn = currentImageIndex > 0;
  const viewNextBtn = currentImageIndex < images.length - 1;

  useEffect(() => {
    if (isDelete) {
      changeCurrentImage(images.filter((el) => el.id !== deleteImageId)[0].id);
      dispatch(postActions.deleteImage({ id: deleteImageId }));
      setDelete(false);
    }
  }, [deleteImageId]);

  if (!currentImageId) {
    return null;
  }

  return (
    <div className={s.cropping__wrapper}>
      <CroppingModal setStep={setStep} onClose={() => setAreYouSureModal(true)}>
        {sliderIsView && (
          <>
            {viewPrevBtn && (
              <div className={s.cropping__prevBtn} onClick={onPrevImage}>
                <svg width="25" height="43" viewBox="0 0 8 15">
                  <path
                    d="M5.83016 13.9998C5.68077 14.0003 5.53316 13.9673 5.39818 13.9033C5.2632 13.8393 5.14428 13.7458 5.05016 13.6298L0.220164 7.62979C0.073082 7.45085 -0.00732422 7.22641 -0.00732422 6.99479C-0.00732422 6.76316 0.073082 6.53872 0.220164 6.35979L5.22016 0.359788C5.3899 0.155571 5.63381 0.0271464 5.89824 0.00276666C6.16267 -0.0216131 6.42595 0.0600488 6.63016 0.229787C6.83438 0.399526 6.9628 0.643437 6.98718 0.907864C7.01156 1.17229 6.9299 1.43557 6.76016 1.63979L2.29016 6.99979L6.61016 12.3598C6.73245 12.5066 6.81012 12.6853 6.834 12.8749C6.85788 13.0644 6.82697 13.2568 6.74491 13.4294C6.66285 13.6019 6.53309 13.7473 6.37098 13.8484C6.20887 13.9495 6.0212 14.002 5.83016 13.9998Z"
                    fill="rgb(0, 122, 255)"
                  />
                </svg>
              </div>
            )}
            {viewNextBtn && (
              <div className={s.cropping__nextBtn} onClick={onNextImage}>
                <svg width="25" height="43" viewBox="0 0 8 15">
                  <path
                    d="M0.999807 14.9999C0.766155 15.0004 0.539719 14.919 0.359807 14.7699C0.258548 14.686 0.174846 14.5829 0.113494 14.4665C0.0521425 14.3502 0.0143462 14.2229 0.0022703 14.0919C-0.00980557 13.9609 0.00407645 13.8289 0.0431209 13.7033C0.0821654 13.5777 0.145605 13.461 0.229806 13.3599L4.70981 7.99994L0.389807 2.62994C0.306741 2.52765 0.24471 2.40996 0.207278 2.28362C0.169846 2.15728 0.157752 2.02479 0.171691 1.89376C0.185631 1.76273 0.225328 1.63575 0.288501 1.52011C0.351675 1.40447 0.43708 1.30246 0.539807 1.21994C0.643273 1.1289 0.764439 1.06024 0.895701 1.01825C1.02696 0.976258 1.16549 0.961855 1.30258 0.97594C1.43967 0.990024 1.57238 1.03229 1.69236 1.1001C1.81234 1.1679 1.91701 1.25977 1.99981 1.36994L6.82981 7.36994C6.97689 7.54887 7.05729 7.77332 7.05729 8.00494C7.05729 8.23657 6.97689 8.46101 6.82981 8.63994L1.82981 14.6399C1.72949 14.761 1.60206 14.8566 1.45785 14.9192C1.31364 14.9817 1.15671 15.0094 0.999807 14.9999Z"
                    fill="rgb(0, 122, 255)"
                  />
                </svg>
              </div>
            )}
          </>
        )}

        <PostCropper
          zoom={currentImage.zoom}
          onValueChange={onZoomImage}
          aspectRatio={currentImage.aspectRatio ?? AspectRatioType.one}
          currentImageId={currentImageId}
        />
        <div className={s.itemsContainer}>
          <div className={s.leftItems}>
            <AspectRatio imageId={currentImageId} />
            <Range onValueChange={onZoomImage} value={currentImage.zoom} />
          </div>
          <Gallery
            changeCurrentImage={changeCurrentImage}
            deleteImage={deleteImage}
            setStep={setStep}
          />
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
