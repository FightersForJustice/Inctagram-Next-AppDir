import React, { useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { AspectRatioType } from "../CreatePost";

type Props = {
  postImage: string;
  aspectRatio: AspectRatioType;
  zoomValue: string;
  setCroppedPostImage: (value: string) => void;
};

export const PostCropper: React.FC<Props> = ({ postImage, zoomValue, aspectRatio, setCroppedPostImage }) => {
  const cropperRef = useRef<ReactCropperElement>(null);

  const onCropEnd = () => {
    const cropper = cropperRef.current?.cropper;
    setCroppedPostImage(cropper?.getCroppedCanvas().toDataURL()!);
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
        aspectRatio={1}
        //zoomTo={+zoomValue / 100}
        cropend={onCropEnd}
      />
    </>
  );
};
