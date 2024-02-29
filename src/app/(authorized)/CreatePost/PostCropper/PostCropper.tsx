'use client';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { useAppSelector } from '@/redux/hooks/useSelect';
import { postActions } from '@/redux/reducers/post/postReducer';
import 'cropperjs/dist/cropper.css';
import { useEffect, useRef } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { ImageStateType } from '@/app/(authorized)/CreatePost/CreatePost';

export const PostCropper = ({ zoomValue }: Props) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const ratio = useAppSelector((state) => state.post.cropAspectRatio);
  const currentImage = useAppSelector((state) => state.post.currentImage);
  const currentImageId = useAppSelector((state) => state.post.currentImage?.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    cropperRef.current?.cropper.setAspectRatio(ratio);
  }, [ratio]);

  console.log('currentImage', currentImage);

  const onCropEnd = () => {
    const cropper = cropperRef.current?.cropper;
    const value = cropper?.getCroppedCanvas().toDataURL()!;
    console.log(currentImageId);
    if (currentImage) {
      console.log(currentImageId);
      dispatch(
        postActions.changeImage({
          id: currentImageId,
          image: value,
        })
      );
    }
  };

  return (
    <Cropper
      src={`${
        currentImage ? currentImage.image : '/img/create-post/test-image.png'
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
    />
  );
};

type Props = {
  aspectRatio: number;
  zoomValue: string;
  currentImage?: ImageStateType;
};
