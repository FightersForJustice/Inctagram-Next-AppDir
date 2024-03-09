'use client';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { useAppSelector } from '@/redux/hooks/useSelect';
import { useState } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import { getCroppedImg } from '@/app/(authorized)/CreatePost/PostCropper/cropperUtils';
import { ChangedImage, postActions } from '@/redux/reducers/post/postReducer';
import { postImageById } from '@/redux/reducers/post/postSelectors';
import { AspectRatioType } from '@/app/(authorized)/CreatePost/CreatePost';

export const PostCropper = ({ currentImageId, aspectRatio, zoom }: Props) => {
  const currentImage = useAppSelector((state) =>
    postImageById(state, currentImageId)
  );
  const dispatch = useAppDispatch();

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  const onCropEnd = async (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log('croppedArea', croppedArea);
    console.log('croppedAreaPixels', croppedAreaPixels);
    try {
      if (currentImage) {
        const image = await getCroppedImg(
          currentImage.image,
          croppedAreaPixels,
          rotation
        );

        if (image) {
          const croppedImage: Omit<ChangedImage, 'filter' | 'cropAspectRatio'> =
            {
              image,
              croppedArea: croppedAreaPixels,
              id: currentImage.id,
            };
          console.log('donee', { croppedImage });
          dispatch(postActions.setCropImage(croppedImage));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const setZoom = (zoom: number) => {
    dispatch(postActions.setZoom(zoom));
  };

  return (
    <Cropper
      image={`${
        currentImage ? currentImage.image : '/img/create-post/test-image.png'
      }`}
      zoom={zoom}
      crop={crop}
      aspect={aspectRatio}
      onCropChange={setCrop}
      onZoomChange={setZoom}
      onRotationChange={setRotation}
      minZoom={1}
      maxZoom={10}
      onCropComplete={onCropEnd}
      showGrid={false}
    />
  );
};

type Props = {
  currentImageId: string;
  aspectRatio: AspectRatioType;
  zoom: number;
};
