"use client";
import React, { Dispatch, SetStateAction, useEffect, useId, useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { AspectRatioType, ImageStateType } from "../CreatePost";
import { useAppDispatch } from "@/redux/hooks/useDispatch";
import { postActions } from "@/redux/reducers/post/postReducer";
import { useAppSelector } from "@/redux/hooks/useSelect";
import { imagesGallery } from "@/redux/reducers/post/postSelectors";

type Props = {
  postImage: ImageStateType;
  aspectRatio: number;
  zoomValue: string;
  setCroppedPostImage: (value: any) => void;
  loadedImages: ImageStateType[];
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
  const id = crypto.randomUUID();

  const dispatch = useAppDispatch();
  const imageCollection = useAppSelector(imagesGallery);

  const onCropEnd = () => {
    const cropper = cropperRef.current?.cropper;
    const value = cropper?.getCroppedCanvas().toDataURL()!;
    setCroppedPostImage(value);
    if (postImage) {
      const image = { id: postImage.id, image: postImage.image };
      image.image = value;
      dispatch(postActions.changeImageFromPostGallery(image));
    }
  };

  return (
    <>
      <Cropper
        src={`${postImage?.image ? postImage.image : "/img/create-post/test-image.png"}`}
        style={{
          transform: `scale(${+zoomValue / 10})`,
          //aspectRatio: aspectRatio.replace(":", "/"),
          width: "100%",
        }}
        guides={false}
        ref={cropperRef}
        initialAspectRatio={aspectRatio}
        // zoomTo={+zoomValue / 100}
        cropend={onCropEnd}
      />
    </>
  );
};
