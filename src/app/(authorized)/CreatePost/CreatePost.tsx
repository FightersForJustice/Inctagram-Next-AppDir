import { useState } from 'react';

import { GetResponse } from '@/api/profile.api';
import { FirstModal } from './FirstModal';
import { SecondModal } from './SecondModal';
import { ThirdModal } from './ThirdModal';
import { FourthModal } from './FourthModal';
import { useAppSelector } from '@/redux/hooks/useSelect';
import { postImages } from '@/redux/reducers/post/postSelectors';

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

  const [file, setFile] = useState<File[]>();
  const [croppedPostImage, setCroppedPostImage] = useState('');
  const [loadedImages, setLoadedImages] = useState<ImageStateType[]>([]);
  const [zoomValue, setZoomValue] = useState('3');
  const aspectRatio = useAppSelector((state) => state.post.cropAspectRatio);

  const postImagesArr = useAppSelector(postImages);
  const currentImage =
    postImagesArr[postImagesArr.length > -1 ? postImagesArr.length - 1 : 0];

  const closeCreatePostModal = (value: boolean) => {
    setShowCreatePostModal(value);
    sessionStorage.removeItem('userPostImage');
  };

  return (
    <>
      {showCreatePostModal && step === 1 && (
        <FirstModal
          setStep={setStep}
          currentFile={file}
          setFile={setFile}
          setShowCreatePostModal={closeCreatePostModal}
          setLoadedImages={setLoadedImages}
          loadedImages={loadedImages}
        />
      )}

      {step === 2 && (
        <SecondModal
          postImage={currentImage}
          setStep={setStep}
          aspectRatio={aspectRatio}
          setZoomValue={setZoomValue}
          zoomValue={zoomValue}
          setShowCreatePostModal={closeCreatePostModal}
          setLoadedImages={setLoadedImages}
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
