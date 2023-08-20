import React, { MouseEventHandler, useState } from "react";

import s from "./PostFix.module.scss";
import Image from "next/image";
import { PostContent } from "./PostContent/PostContent";
import { EditPost } from "./EditPost/EditPost";
import { useDeletePostMutation, useGetPostQuery } from "../../../../../api/posts.api";
import { Loader } from "../../../../../components/Loader/Loader";
import { toast } from "react-toastify";
import { Dots } from "./Dots/Dots";

type Props = {
  onClose: MouseEventHandler<HTMLButtonElement>;
  postId: number | undefined;
  avatar: string;
  userName: string;
  setOpenPostModal: (value: boolean) => void;
};

export const PostFix: React.FC<Props> = ({ onClose, postId, avatar, userName, setOpenPostModal }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [showDots, setShowDots] = useState(true);
  const [editPost, setEditPost] = useState(false);
  const [showAreYouSureModal, setShowAreYouSureModal] = useState(false);

  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
  const { data, isLoading } = useGetPostQuery(postId!);

  const onDeletePost = () => {
    deletePost(postId!)
      .unwrap()
      .then(() => {
        setOpenPostModal(false);
        toast.success("Post was deleted");
      });
  };

  return (
    <>
      {data ? (
        <div className={"relative"}>
          <div className={s.post}>
            <Image src={data?.images[0]?.url} alt={"post"} width={491} height={480} className={s.post__img} />
            <div className={s.post__container}>
              <div className={s.post__header}>
                <div className={s.post__header__wrapper}>
                  <Image
                    src={avatar ?? "/img/create-post/no-image.png"}
                    alt={"ava"}
                    width={36}
                    height={36}
                    className={s.post__header__img}
                  />
                  <p>{userName}</p>
                </div>

                {showDots ? (
                  <Dots
                    setVisiblePopup={setVisiblePopup}
                    visiblePopup={visiblePopup}
                    setEditPost={setEditPost}
                    setShowAreYouSureModal={setShowAreYouSureModal}
                    setShowDots={setShowDots}
                  />
                ) : (
                  <div className={"w-1/12"}></div>
                )}
              </div>
              {editPost ? (
                <EditPost
                  setEditPost={setEditPost}
                  description={data.description}
                  postId={postId}
                  setShowDots={setShowDots}
                />
              ) : (
                <PostContent
                  avatar={avatar}
                  userName={userName}
                  description={data.description}
                  setVisiblePopup={setVisiblePopup}
                  showAreYouSureModal={showAreYouSureModal}
                  setShowAreYouSureModal={setShowAreYouSureModal}
                  onDeletePost={onDeletePost}
                />
              )}
            </div>
          </div>
          <button className={"absolute top-[-14px] right-[-37px]"} onClick={onClose}>
            <Image src={"/img/close.svg"} alt={"close"} width={24} height={24} />
          </button>
        </div>
      ) : (
        <Loader />
      )}
      {isLoading && <Loader />}
      {isDeleting && <Loader />}
    </>
  );
};
