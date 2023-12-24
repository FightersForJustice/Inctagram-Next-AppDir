'use client';
import React, { useEffect, useRef } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { ImageStateType } from '../CreatePost';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { postActions } from '@/redux/reducers/post/postReducer';
import { useAppSelector } from '@/redux/hooks/useSelect';

type Props = {
  postImage: ImageStateType;
  aspectRatio: number;
  zoomValue: string;
  setCroppedPostImage: (value: any) => void;
  loadedImages: ImageStateType[];
  setLoadedImages: (value: any) => void;
};

export const PostCropper: React.FC<Props> = ({
  postImage,
  zoomValue,
  setCroppedPostImage,
}) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const ratio = useAppSelector((state) => state.post.cropAspectRatio);
  const dispatch = useAppDispatch();

  useEffect(() => {
    cropperRef.current?.cropper.setAspectRatio(ratio);
  }, [ratio]);
  const onCropEnd = () => {
    const cropper = cropperRef.current?.cropper;
    const value = cropper?.getCroppedCanvas().toDataURL()!;
    setCroppedPostImage(value);
    if (postImage) {
      const image = { id: postImage.id, image: postImage.image, filter: '' };
      image.image = value;
      dispatch(postActions.changeImageFromPostGallery(image));
    }
  };
  return (
    <>
      <Cropper
        src={`${
          postImage?.image ? postImage.image : '/img/create-post/test-image.png'
        }`}
        style={{
          transform: `scale(${+zoomValue / 10})`,
          width: '100%',
          zIndex: '100',
        }}
        ref={cropperRef}
        cropend={onCropEnd}
        background={false}
        zoomable={false}
        checkOrientation={true}
        initialAspectRatio={1}
        crop={onCropEnd}
      />
    </>
  );
};
