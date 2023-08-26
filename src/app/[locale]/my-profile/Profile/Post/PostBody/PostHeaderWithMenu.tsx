import style from "../Post.module.scss";
import { SmartMenu } from "./SmartMenu";
import React from "react";
type Props = {
  avatar: string;
  userName: string;
  openMenu: (value: boolean) => void;
  menuIsOpen: boolean;
  setEditMode: (value: boolean) => void;
  setOpenDeleteModal: (value: boolean) => void;
};

export const PostHeaderWithMenu = ({
  avatar,
  userName,
  openMenu,
  menuIsOpen,
  setEditMode,
  setOpenDeleteModal,
}: Props) => {
  return (
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
        onClick={() => openMenu(true)}
      />
      {menuIsOpen && (
        <SmartMenu
          onClickEdit={setEditMode}
          onClickDelete={() => {
            setOpenDeleteModal(true);
          }}
        />
      )}
    </div>
  );
};
