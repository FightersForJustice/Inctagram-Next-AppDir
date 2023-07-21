import style from "../../Post.module.scss";
import React from "react";

type Props = {
  description?: string;
  userName?: string;
  userAvatar?: string;
  creatingTime?: string;
};
export const PostComment = ({ description, userName, userAvatar, creatingTime }: Props) => {
  return (
    <div className={style.comment}>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={userAvatar} alt="/img/settings-profile/load-avatar.svg" className={style.comment_avatar} />
      </div>
      <span className={style.comment_commentBody}>
        <b>{userName ?? ""} </b>
        {description ?? ""}
        <p style={{ color: "#8D9094" }}>{creatingTime}</p>
      </span>
    </div>
  );
};
