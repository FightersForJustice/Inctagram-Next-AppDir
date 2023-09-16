import React, { ChangeEvent, useState } from "react";
import s from "./CreatePost.module.scss";
import Image from "next/image";
import { FiltersModal } from "@/components/Modals/FiltersModal";
import { useCreatePostMutation, useDeletePostImageMutation } from "@/api";
import { toast } from "react-toastify";
import { Loader } from "@/components/Loader";
import { AreYouSureModal } from "@/components/Modals/AreYouSureModal";
import { AspectRatioType } from "./CreatePost";
import { GetResponse } from "@/api/profile.api";
import { Carousel } from "@/components/Carousel/Carousel";
import { useAppSelector } from "@/redux/hooks/useSelect";
import { postImagesIds } from "@/redux/reducers/post/postSelectors";

type Props = {
  showThirdModal: () => void;
  aspectRatio: AspectRatioType;
  zoomValue: string;
  setShowCreatePostModal: (value: boolean) => void;
  userData: GetResponse;
};

export const FourthModal: React.FC<Props> = ({
  showThirdModal,
  aspectRatio,
  zoomValue,
  setShowCreatePostModal,
  userData,
}) => {
  const [textareaLength, setTextareaLength] = useState(0);
  const [textareaValue, setTextareaValue] = useState("");
  const [areYouSureModal, setAreYouSureModal] = useState(false);

  const imagesIds = useAppSelector(postImagesIds);
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [deleteImage, { isLoading: isDeleting }] = useDeletePostImageMutation();
  const images = useAppSelector((state) => state.post.postImages);
  const [activeImage, setActiveImage] = useState<string>(images[0].image || "");
  const onTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.value.length > 500) return;
    setTextareaLength(e.currentTarget.value.length);
    setTextareaValue(e.currentTarget.value);
  };

  const onPublishPost = () => {
    createPost({
      description: textareaValue,
      childrenMetadata: imagesIds,
    })
      .unwrap()
      .then(() => {
        toast.success("Post created");
        setShowCreatePostModal(false);
      })
      .catch(() => {
        toast.error("Error");
      });
  };

  const onDeletePostImage = () => {
    const uploadId = localStorage.getItem("uploadId");

    deleteImage(uploadId!)
      .unwrap()
      .then(() => {
        showThirdModal?.();
        toast.success("Post image deleted");
      })
      .catch(() => {
        toast.error("Error");
      });
  };

  return (
    <>
      <FiltersModal
        title={"Publication"}
        width={"972px"}
        buttonName={"Publish"}
        onPublishPost={onPublishPost}
        onClose={() => setAreYouSureModal(true)}
        onDeletePostImage={onDeletePostImage}
      >
        <div className={s.cropping__publication}>
          <div className={s.cropping__publication__box}>
            <Carousel loadedImages={images} setActive={setActiveImage} />
          </div>
          <div className={s.cropping__publication__container}>
            <div className={s.cropping__publication__header}>
              <Image
                src={`${userData?.avatars[1]?.url ?? "/img/create-post/no-image.png"}`}
                alt={"image"}
                width={36}
                height={36}
                className={s.cropping__publication__image}
              />
              <p>{`${userData ? userData.userName : ""}`}</p>
            </div>
            <div>
              <div className={s.cropping__publication__wrapper}>
                <p className={s.cropping__publication__text}>Add publication descriptions</p>
                <p style={{ color: `${textareaLength > 499 ? "red" : "#8D9094"}` }}>{textareaLength} / 500</p>
              </div>
              <textarea
                cols={30}
                rows={10}
                className={s.cropping__publication__textarea}
                placeholder={"Description..."}
                maxLength={500}
                onChange={onTextareaHandler}
                value={textareaValue}
              />
            </div>
          </div>
        </div>
      </FiltersModal>
      {areYouSureModal && (
        <AreYouSureModal
          toggleAreYouSureModal={setAreYouSureModal}
          toggleModal={setShowCreatePostModal}
          onDelete={onDeletePostImage}
          isDeleting={isDeleting}
        />
      )}
      {isDeleting && <Loader />}
      {isLoading && <Loader />}
    </>
  );
};
