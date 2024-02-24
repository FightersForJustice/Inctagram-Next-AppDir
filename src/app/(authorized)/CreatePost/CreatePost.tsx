import { useState } from 'react';

import { GetResponse } from '@/api/profile.api';
import { useAppSelector } from '@/redux/hooks/useSelect';
import { postImages } from '@/redux/reducers/post/postSelectors';
import { FirstModal } from './FirstModal';
import { FourthModal } from './FourthModal';
import { SecondModal } from './SecondModal';
import { ThirdModal } from './ThirdModal';

type Props = {
  showCreatePostModal: boolean;
  setShowCreatePostModal: (value: boolean) => void;
  userData: GetResponse;
};

export const CreatePost = ({
  showCreatePostModal,
  setShowCreatePostModal,
  userData,
}: Props) => {
  const [step, setStep] = useState<number>(1);

  // ONE STEP STATE
  const [images, setImages] = useState<File[]>([]);

  const [croppedPostImage, setCroppedPostImage] = useState('');
  const [zoomValue, setZoomValue] = useState('0');

  const aspectRatio = useAppSelector((state) => state.post.cropAspectRatio);

  const postImagesArr = useAppSelector(postImages);
  const currentImage = postImagesArr[postImagesArr.length - 1];

  const closeCreatePostModal = (show: boolean) => {
    setShowCreatePostModal(show);
    sessionStorage.removeItem('userPostImage');
  };

  return (
    <>
      {showCreatePostModal && step === 1 && (
        <FirstModal
          setStep={setStep}
          images={images}
          setImage={setImages}
          setShowCreatePostModal={closeCreatePostModal}
        />
      )}

      {step === 2 && (
        <SecondModal
          currentImage={currentImage}
          setStep={setStep}
          aspectRatio={aspectRatio}
          setZoomValue={setZoomValue}
          zoomValue={zoomValue}
          setShowCreatePostModal={closeCreatePostModal}
          setCroppedPostImage={setCroppedPostImage}
          croppedPostImage={croppedPostImage}
        />
      )}
      {step === 3 && (
        <ThirdModal
          setStep={setStep}
          zoomValue={zoomValue}
          setShowCreatePostModal={closeCreatePostModal}
        />
      )}
      {step === 4 && (
        <FourthModal
          setStep={setStep}
          setShowCreatePostModal={closeCreatePostModal}
          userData={userData}
        />
      )}
    </>
  );
};

export enum AspectRatioType {
  one = 1,
  two = 4 / 3,
  three = 4 / 5,
  four = 16 / 9,
}

export type ImageStateType = {
  id: string;
  image: string;
  filter: string;
};
