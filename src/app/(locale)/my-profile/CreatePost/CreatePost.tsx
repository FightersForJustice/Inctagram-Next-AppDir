import React, { useState } from 'react';
import { GetResponse } from '@/api/profile.api';
import { FirstModal } from './FirstModal';
import { SecondModal } from './SecondModal';
import { ThirdModal } from './ThirdModal';
import { FourthModal } from './FourthModal';
import { postActions } from '@/redux/reducers/post/postReducer';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { useAppSelector } from '@/redux/hooks/useSelect';
import { imagesGallery, postImages } from '@/redux/reducers/post/postSelectors';

type Props = {
  showCreatePostModal: boolean;
  setShowCreatePostModal: (value: boolean) => void;
  userData: GetResponse;
};

export const CreatePost: React.FC<Props> = ({
  showCreatePostModal,
  setShowCreatePostModal,
  userData,
}) => {
  const [file, setFile] = useState<File[]>();
  const [third, setThird] = useState(false);
  const [fourth, setFourth] = useState(false);
  const [postImage, setPostImage] = useState('');
  const [croppedPostImage, setCroppedPostImage] = useState('');
  const [loadedImages, setLoadedImages] = useState<ImageStateType[]>([]);
  const [zoomValue, setZoomValue] = useState('10');
  const aspectRatio = useAppSelector((state) => state.post.cropAspectRatio);

  const dispatch = useAppDispatch();
  const postImagesArr = useAppSelector(postImages);
  const imagesGalleryArr = useAppSelector(imagesGallery);
  const currentImage =
    postImagesArr[postImagesArr.length > -1 ? postImagesArr.length - 1 : 0];

  const showSecondModal = () => {
    setThird(false);
    setFourth(false);
  };

  const showThirdModal = () => {
    dispatch(postActions.removeAllImages());
    imagesGalleryArr.map((i: any) => {
      dispatch(postActions.addImage(i));
    });
    setThird(true);
    setFourth(false);
  };

  const showFourthModal = () => {
    setThird(false);
    setFourth(true);
  };

  return (
    <>
      {showCreatePostModal && !postImage && (
        <FirstModal
          currentFile={file}
          setFile={setFile}
          setPostImage={setPostImage}
          setShowCreatePostModal={setShowCreatePostModal}
          setLoadedImages={setLoadedImages}
          loadedImages={loadedImages}
        />
      )}

      {postImage && (
        <SecondModal
          postImage={currentImage}
          setPostImage={setPostImage}
          showThirdModal={showThirdModal}
          aspectRatio={aspectRatio}
          setZoomValue={setZoomValue}
          zoomValue={zoomValue}
          setShowCreatePostModal={setShowCreatePostModal}
          setLoadedImages={setLoadedImages}
          setCroppedPostImage={setCroppedPostImage}
          croppedPostImage={croppedPostImage}
        />
      )}
      {third && (
        <ThirdModal
          showSecondModal={showSecondModal}
          showFourthModal={showFourthModal}
          zoomValue={zoomValue}
          setShowCreatePostModal={setShowCreatePostModal}
        />
      )}
      {fourth && (
        <FourthModal
          showThirdModal={showThirdModal}
          setShowCreatePostModal={setShowCreatePostModal}
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
