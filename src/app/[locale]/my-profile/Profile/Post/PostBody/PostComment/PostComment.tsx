import style from "../../Post.module.scss";
import React from "react";

type Props = {
  description?: string;
  userName?: string;
  userAvatar?: string;
  creatingTime?: string;
  answer?: boolean;
  likes?: number;
  myLike?: boolean;
};
export const PostComment = ({ description, userName, userAvatar, creatingTime, answer, likes, myLike }: Props) => {
  return (
    <div className={style.comment}>
      <div className={style.comment_body}>
        <div className={style.comment_avatarBlock}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={userAvatar} alt="/img/settings-profile/load-avatar.svg" className={style.comment_avatarBlock_img} />
        </div>
        <span className={style.comment_commentBody}>
          <span>
            <b>{userName ?? ""}</b>
            {description ?? ""}
          </span>
          <p style={{ color: "#8D9094" }}>
            {creatingTime} {likes ? <span>Like: {likes}</span> : ""} {answer && <span>Answer</span>}
          </p>
        </span>
      </div>

      <div className={style.comment_like}>
        {myLike ? (
          <img src="/img/profile/posts/posts-likes/heart.svg" alt="like" />
        ) : (
          <img src="/img/profile/posts/posts-likes/heart-outline.svg" alt="like" />
        )}
      </div>
    </div>
  );
};
