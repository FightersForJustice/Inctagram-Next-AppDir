'use client';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { useAppSelector } from '@/redux/hooks/useSelect';
import 'cropperjs/dist/cropper.css';
import { useEffect, useRef } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { ImageStateType } from '../CreatePost';

type Props = {
  postImage: ImageStateType | null;
  aspectRatio: number;
  zoomValue: string;
};

export const PostCropper = ({ postImage, zoomValue }: Props) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const ratio = useAppSelector((state) => state.post.cropAspectRatio);
  const dispatch = useAppDispatch();

  useEffect(() => {
    cropperRef.current?.cropper.setAspectRatio(ratio);
  }, [ratio]);

  console.log('hello im post cropper');

  const onCropEnd = () => {
    const cropper = cropperRef.current?.cropper;
    const value = cropper?.getCroppedCanvas().toDataURL()!;
    console.log('cropped value outside post image', value);
    if (postImage) {
      console.log('cropped value', value);
      // dispatch(postActions.changeImageFromPostGallery(image));
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
