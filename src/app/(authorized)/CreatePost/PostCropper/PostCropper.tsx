'use client';
import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { useAppSelector } from '@/redux/hooks/useSelect';
import { useState } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import { getCroppedImg } from '@/app/(authorized)/CreatePost/PostCropper/cropperUtils';
import { ChangedImage, postActions } from '@/redux/reducers/post/postReducer';
import { changedImageById, postImageById, postImages } from '@/redux/reducers/post/postSelectors';
import { AspectRatioType } from '@/app/(authorized)/CreatePost/CreatePost';

export const PostCropper = ({ currentImageId, aspectRatio, zoom }: Props) => {
  const currentImage = useAppSelector((state) =>
    postImageById(state, currentImageId),
  );
  const currentChangedImage = useAppSelector((state) =>
    changedImageById(state, currentImageId),
  );
  const dispatch = useAppDispatch();

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const images = useAppSelector(postImages);


  const onCropEnd = async (croppedArea: Area, croppedAreaPixels: Area) => {
    try {
      if (currentImage) {
        const image = await getCroppedImg(
          currentImage.originalImage,
          croppedAreaPixels,
          rotation,
        );

        if (image) {
          const croppedImage: Omit<ChangedImage, 'base64Image' | 'filter' | 'cropAspectRatio' | 'originalImage'> =
            {
              image,
              croppedArea: croppedAreaPixels,
              id: currentImage.id,
              aspectRatio: aspectRatio,
              zoom: 1,
            };
          dispatch(postActions.setCropImage(croppedImage));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const setZoom = (zoom: number) => {
    dispatch(postActions.setZoom({ id: currentImageId, zoom }));
  };

  return (
    <Cropper
      image={`${
        currentImage ? currentImage.originalImage : images[0].originalImage
      }`}
      zoom={zoom}
      crop={crop}
      initialCroppedAreaPixels={currentChangedImage?.croppedArea}
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
