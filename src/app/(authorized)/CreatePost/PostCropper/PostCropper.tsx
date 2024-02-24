'use client';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { useAppSelector } from '@/redux/hooks/useSelect';
import { postActions } from '@/redux/reducers/post/postReducer';
import 'cropperjs/dist/cropper.css';
import { useEffect, useRef } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { ImageStateType } from '../CreatePost';

type Props = {
  postImage: ImageStateType;
  aspectRatio: number;
  zoomValue: string;
  setCroppedPostImage: (value: any) => void;
};

export const PostCropper = ({
  postImage,
  zoomValue,
  setCroppedPostImage,
}: Props) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const ratio = useAppSelector((state) => state.post.cropAspectRatio);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(postImage);
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
    <Cropper
      src={`${
        postImage?.image ? postImage.image : '/img/create-post/test-image.png'
      }`}
      style={{
        width: '100%',
        zIndex: '10',
      }}
      zoomTo={+zoomValue / 10}
      ref={cropperRef}
      cropend={onCropEnd}
      background={false}
      zoomable={true}
      checkOrientation={true}
      initialAspectRatio={1}
      crop={onCropEnd}
    />
  );
};
