import React, { MouseEventHandler, useState } from "react";

import s from "./PostFix.module.scss";
import Image from "next/image";
import { PostPopup } from "./PostPopup/PostPopup";
import * as Popover from "@radix-ui/react-popover";
import { PostContent } from "./PostContent/PostContent";
import { EditPost } from "./EditPost/EditPost";
import { useDeletePostMutation, useGetPostQuery } from "../../../../../api/posts.api";
import { Loader } from "../../../../../components/Loader/Loader";
import { toast } from "react-toastify";

type Props = {
  onClose: MouseEventHandler<HTMLButtonElement>;
  postId: number | undefined;
  avatar: string;
  userName: string;
  setOpenPostModal: (value: boolean) => void;
};

export const PostFix: React.FC<Props> = ({ onClose, postId, avatar, userName, setOpenPostModal }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
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
                  <Image src={avatar} alt={"ava"} width={36} height={36} className={s.post__header__img} />
                  <p>{userName}</p>
                </div>

                <Popover.Root onOpenChange={() => setVisiblePopup(!visiblePopup)}>
                  <Popover.Trigger>
                    <svg
                      style={{ cursor: "pointer" }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                        fill={`${visiblePopup ? "#397DF6" : "white"}`}
                      />
                      <path
                        d="M19 14C20.1046 14 21 13.1046 21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14Z"
                        fill={`${visiblePopup ? "#397DF6" : "white"}`}
                      />
                      <path
                        d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14Z"
                        fill={`${visiblePopup ? "#397DF6" : "white"}`}
                      />
                    </svg>
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Content className="PopoverContent" sideOffset={5} style={{ zIndex: 1111 }}>
                      <PostPopup
                        setEditPost={setEditPost}
                        setVisiblePopup={setVisiblePopup}
                        postId={postId}
                        toggleShowAreYouSureModal={() => setShowAreYouSureModal(true)}
                      />
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
              </div>
              {editPost ? (
                <EditPost setEditPost={setEditPost} description={data.description} postId={postId} />
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
