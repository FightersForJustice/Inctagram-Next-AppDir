import { useAppDispatch } from '@/redux/hooks/useDispatch';
import { useAppSelector } from '@/redux/hooks/useSelect';
import { useState } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import { ChangedImage, postActions } from '@/redux/reducers/post/postReducer';
import {
  changedImageById,
  postImageById,
  postImages,
} from '@/redux/reducers/post/postSelectors';
import { AspectRatioType } from '@/app/(authorized)/CreatePost/CreatePost';
import { getCroppedImg } from '@/utils/cropperUtils';

export const PostCropper = ({
  currentImageId,
  aspectRatio = 1,
  zoom = 1,
  shape = 'rect',
  onValueChange,
  setCroppedAvatar,
  image,
  skip,
}: Props) => {
  const currentImage = image
    ? image
    : useAppSelector((state) => postImageById(state, currentImageId));
  const currentChangedImage = useAppSelector((state) =>
    changedImageById(state, currentImageId)
  );
  const images = useAppSelector(postImages);
  const dispatch = useAppDispatch();

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  const onCropEnd = async (croppedArea: Area, croppedAreaPixels: Area) => {
    try {
      if (currentImage) {
        const image = await getCroppedImg(
          currentImage.originalImage,
          croppedAreaPixels,
          rotation
        );

        if (image) {
          const croppedImage: Omit<
          ChangedImage,
          'base64Image' | 'filter' | 'cropAspectRatio' | 'originalImage'
        > = {
          image,
          croppedArea: croppedAreaPixels,
          id: currentImage.id,
          aspectRatio: aspectRatio,
          zoom: 1,
        };
        if (skip && setCroppedAvatar) {
          console.log('2',typeof image)
          return setCroppedAvatar(croppedImage)
        }
          dispatch(postActions.setCropImage(croppedImage));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  // const setZoom = (zoom: number) => {
  //   dispatch(postActions.setZoom({ id: currentImageId, zoom }));
  // };

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
      onZoomChange={() => onValueChange(zoom)}
      onRotationChange={setRotation}
      minZoom={1}
      maxZoom={10}
      onCropComplete={onCropEnd}
      showGrid={false}
      cropShape={shape}
    />
  );
};

type Props = {
  currentImageId: string;
  image?: { originalImage: string; id: string };
  onValueChange: (id: number) => void;
  setCroppedAvatar?: (value: Omit<
    ChangedImage,
    'base64Image' | 'filter' | 'cropAspectRatio' | 'originalImage'>) => void;
  aspectRatio?: AspectRatioType;
  zoom?: number;
  skip?: boolean;
  shape?: 'rect' | 'round';
};
