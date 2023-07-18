"use client";
import React, { ChangeEvent, useState } from "react";
import style from "./Post.module.scss";
import { useGetPostQuery } from "../../../../../api/posts.api";
import { Loader } from "../../../../../components/Loader/Loader";
import { PostBody } from "./PostBody";

export const Post = ({ uploadId, avatar, userName }: { uploadId?: number; avatar?: string; userName?: string }) => {
  const { data, isSuccess } = useGetPostQuery(uploadId ?? 0);
  const [editMode, setEditMode] = useState(false);

  return (
    <div className={style.post_container}>
      <div className={style.post_container_body}>
        <div className={style.post_container_body_image}>
          {isSuccess ? (
            <img
              src={data.images[0].url}
              alt="/img/settings-profile/load-avatar.svg"
              className={style.post_container_body_image_img}
            />
          ) : (
            <Loader />
          )}
        </div>
        <PostBodyEdit avatar={avatar} userName={userName} description={data?.description} />
        {/*<PostBody avatar={avatar} userName={userName} isSuccess={isSuccess} data={data} />*/}
      </div>
    </div>
  );
};

const PostBodyEdit = ({
  avatar,
  userName,
  description,
}: {
  avatar?: string;
  userName?: string;
  description?: string;
}) => {
  const [value, setValue] = useState<string>(description ?? "");
  const setNewValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className={style.post_container_info}>
      <div className={style.post_container_info_header}>
        <div className={style.post_container_info_header_userData}>
          <img src={avatar} alt="err" className={style.container_info_header_avatar_img} />
          <span>{userName}</span>
        </div>
      </div>
      <div>
        <form>
          <input type="text" value={value} onChange={setNewValue} className={style.postBodyEdit_input} />
        </form>
      </div>
    </div>
  );
};
