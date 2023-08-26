import style from "../Post.module.scss";
import { PostComment } from "./PostComment";
import { Loader } from "@/components/Loader";
import React, { useState } from "react";
import { DeletePost } from "./SmartMenu/DeletePost";

import { Modal } from "@/components/Modals/Modal";
import { PostBodyFooter } from "./PostBodyFooter";
import { PostHeaderWithMenu } from "./PostHeaderWithMenu";
import { actualCreateDate } from "@/utils";

type PropsType = {
  isSuccess?: boolean;
  data: any;
  userName?: string;
  avatar?: string;
  setEditMode: any;
  uploadId: number;
  createdAt?: string;
  updatedAt?: string;
  refetchPosts?: any;
  setOpen?: any;
};

const testCommentsData = [
  {
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. dolore magna aliqua.",
    userName: "URLProfiele",
    userAvatar: "/img/profile/posts/post6.png",
    creatingTime: "2 Hours ago",
    answer: true,
    myLike: true,
  },
  {
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    userName: "URLProfiele",
    userAvatar: "/img/profile/posts/post7.png",
    creatingTime: "2 Hours ago",
    answer: true,
    likes: 1,
  },
];

export const PostBody = ({
  setOpen,
  isSuccess,
  data,
  userName,
  avatar,
  setEditMode,
  uploadId,
  createdAt,
  updatedAt,
  refetchPosts,
}: PropsType) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const openMenu = () => setMenuIsOpen(!menuIsOpen);

  return (
    <div className={style.post_container_info}>
      <PostHeaderWithMenu
        openMenu={openMenu}
        menuIsOpen={menuIsOpen}
        userName={userName ?? ""}
        setOpenDeleteModal={setOpenDeleteModal}
        avatar={avatar ?? ""}
        setEditMode={setEditMode}
      />
      {isSuccess ? (
        <div className={style.post_container_info_comments}>
          <PostComment
            description={data.description}
            userName={userName}
            userAvatar={avatar}
            creatingTime={actualCreateDate(createdAt, updatedAt)}
          />
          {testCommentsData.map((i) => {
            return (
              <PostComment
                key={i.description}
                description={i.description}
                userName={i.userName}
                userAvatar={i.userAvatar}
                myLike={i.myLike}
                likes={i.likes}
                answer={i.answer}
                creatingTime={i.creatingTime}
              />
            );
          })}
        </div>
      ) : (
        <Loader />
      )}
      <PostBodyFooter />
      {openDeleteModal && (
        <Modal title={"DELETE POST"} onClose={() => setOpenDeleteModal(false)}>
          <DeletePost postId={uploadId ?? 0} setOpenDeleteModal={setOpenDeleteModal} setOpen={setOpen} />
        </Modal>
      )}
    </div>
  );
};
