"use client";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { AspectRatioType, ImageType } from "../CreatePost";

type Props = {
  postImage: string;
  aspectRatio: number;
  zoomValue: string;
  setCroppedPostImage: (value: any) => void;
  loadedImages: ImageType[];
  setLoadedImages: (value: any) => void;
};

export const PostCropper: React.FC<Props> = ({
  loadedImages,
  postImage,
  zoomValue,
  aspectRatio,
  setCroppedPostImage,
  setLoadedImages,
}) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const [ratio, setRatio] = useState(1 / 1);
  const onCropEnd = () => {
    const cropper = cropperRef.current?.cropper;
    setCroppedPostImage(cropper?.getCroppedCanvas().toDataURL()!);
    //
    // const currentImages: ImageType[] = [
    //   ...loadedImages,
    //   {
    //     image: cropper?.getCroppedCanvas().toDataURL()!,
    //     id: cropper?.getCroppedCanvas().toDataURL()!,
    //   },
    // ];
    //
    // setLoadedImages(currentImages.filter((value) => value.id.length > 10));
  };

  return (
    <>
      <Cropper
        src={`${postImage ? postImage : "/img/create-post/test-image.png"}`}
        style={{
          transform: `scale(${+zoomValue / 10})`,
          //aspectRatio: aspectRatio.replace(":", "/"),
          width: "100%",
        }}
        guides={false}
        ref={cropperRef}
        initialAspectRatio={1}
        aspectRatio={aspectRatio}
        // zoomTo={+zoomValue / 100}
        cropend={onCropEnd}
      />
    </>
  );
};
