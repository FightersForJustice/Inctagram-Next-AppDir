import style from "./Post.module.scss";
import { PostComment } from "./PostComment";
import { Loader } from "../../../../../components/Loader/Loader";
import { TransparentBtn } from "../../../../../components/TransparentBtn/TransparentBtn";
import React, { useState } from "react";

export const PostBody = ({
  isSuccess,
  data,
  userName,
  avatar,
}: {
  isSuccess?: boolean;
  data: any;
  userName?: string;
  avatar?: string;
}) => {
  const [focus, setFocus] = useState<boolean>(false);

  return (
    <div className={style.post_container_info}>
      <div className={style.post_container_info_header}>
        <div className={style.post_container_info_header_userData}>
          <img src={avatar} alt="err" className={style.container_info_header_avatar_img} />
          <span>{userName}</span>
        </div>
        <img src={"/img/nav-icons/more-horizontal-outline.svg"} alt="/img/settings-profile/load-avatar.svg" />
      </div>
      {isSuccess ? (
        <PostComment
          description={data.description}
          userName={userName}
          userAvatar={avatar}
          creatingTime={"2 hours ago"}
        />
      ) : (
        <Loader />
      )}
      <div className={style.container_info_footer}>
        <form>
          <input type="text" placeholder={!focus ? "Add a Comment..." : ""} onFocus={() => setFocus(true)} />
          <TransparentBtn>Published</TransparentBtn>
        </form>
      </div>
    </div>
  );
};
