import style from "../Post.module.scss";
import { PostComment } from "./PostComment/PostComment";
import { Loader } from "../../../../../../components/Loader/Loader";
import { TransparentBtn } from "../../../../../../components/TransparentBtn/TransparentBtn";
import React, { useState } from "react";
import { SmartMenu } from "./SmartMenu/SmartMenu";
import { DeletePost } from "./SmartMenu/DeletePost/DeletePost";
import { actualCreateDate } from "../../../../../../utils/actualCreateDate";
import { Modal } from "../../../../../../components/Modals/Modal/Modal";
import { formatServerDateWithoutTime } from "../../../../../../utils/formatServerDate";

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

const imagesArr = ["/img/profile/posts/post5.png", "/img/profile/posts/post6.png", "/img/profile/posts/post7.png"];
const date = new Date().toString();
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
  const [focus, setFocus] = useState<boolean>(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const openMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <div className={style.post_container_info}>
      <div className={style.post_container_info_header}>
        <div className={style.post_container_info_header_userData}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatar} alt="err" className={style.container_info_header_avatar_img} />
          <span>{userName}</span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={"/img/nav-icons/more-horizontal-outline.svg"}
          alt="/img/settings-profile/load-avatar.svg"
          onClick={openMenu}
        />
        {menuIsOpen && (
          <SmartMenu
            onClickEdit={setEditMode}
            onClickDelete={() => {
              setOpenDeleteModal(true);
              refetchPosts();
            }}
          />
        )}
      </div>
      {isSuccess ? (
        <div>
          <PostComment
            description={data.description}
            userName={userName}
            userAvatar={avatar}
            creatingTime={actualCreateDate(createdAt, updatedAt)}
          />
          <PostComment
            description={
              " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            }
            userName={"URLProfiele"}
            userAvatar={"/img/profile/posts/post6.png"}
            creatingTime={"2 Hours ago"}
            answer={true}
            myLike={true}
          />
          <PostComment
            description={
              " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            }
            userName={"URLProfiele"}
            userAvatar={"/img/profile/posts/post7.png"}
            creatingTime={"2 Hours ago"}
            answer={true}
            likes={1}
          />
        </div>
      ) : (
        <Loader />
      )}
      <div className={style.container_info_footer}>
        <div className={style.container_info_footer_header}>
          <div className={style.container_info_footer_header_header}>
            <div className={style.container_info_footer_header_header_firstEl}>
              <img src="/img/profile/posts/posts-likes/heart-outline.svg" alt="like" />
              <img src="/img/profile/posts/paper-plane-outline.svg" alt="paper-plane" />
            </div>
            <div className={style.container_info_footer_header_header_secEl}>
              <img src="/img/profile/posts/bookmark-outline.svg" alt="bookmark-outline" />
            </div>
          </div>

          <div className={style.container_info_footer_header_likes}>
            <div className={style.container_info_footer_header_likes_images}>
              <div>
                {imagesArr.map((i) => (
                  <img key={i} src={i} alt="img" />
                ))}
              </div>
              <div>{formatServerDateWithoutTime(date)}</div>
            </div>

            <div className={style.container_info_footer_header_likes_likesCount}>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              2243 <b>"Like"</b>
            </div>
          </div>
        </div>
        <form>
          <input type="text" placeholder={!focus ? "Add a Comment..." : ""} onFocus={() => setFocus(true)} />
          <TransparentBtn style={{ border: "none" }}>Publish</TransparentBtn>
        </form>
      </div>
      {openDeleteModal && (
        <Modal title={"DELETE POST"} onClose={() => setOpenDeleteModal(false)}>
          <DeletePost postId={uploadId ?? 0} setOpenDeleteModal={setOpenDeleteModal} setOpen={setOpen} />
        </Modal>
      )}
    </div>
  );
};
