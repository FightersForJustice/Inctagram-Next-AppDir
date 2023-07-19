"use client";
import React, { useEffect, useState } from "react";
import style from "./Post.module.scss";
import { useGetPostQuery } from "../../../../../api/posts.api";
import { Loader } from "../../../../../components/Loader/Loader";
import { PostBody } from "./PostBody";
import { PostBodyEdit } from "./PostBodyEdit";

type PropsType = {
  setOpen: (value: boolean) => void;
  uploadId?: number;
  avatar?: string;
  userName?: string;
  setModalHeader: any;
};

export const Post = ({ uploadId, avatar, userName, setOpen, setModalHeader }: PropsType) => {
  const { data, isSuccess, refetch } = useGetPostQuery(uploadId ?? 0);
  const [editMode, setEditMode] = useState(false);

  if (editMode) setModalHeader("Edit");
  useEffect(() => {
    return () => {
      setModalHeader("");
    };
  }, []);
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
        {editMode ? (
          data?.description && (
            <PostBodyEdit
              refetch={refetch}
              setOpen={setOpen}
              avatar={avatar}
              userName={userName}
              description={data?.description}
              uploadId={uploadId}
            />
          )
        ) : (
          <PostBody
            uploadId={uploadId ?? 0}
            setEditMode={setEditMode}
            avatar={avatar}
            userName={userName}
            isSuccess={isSuccess}
            data={data}
          />
        )}
      </div>
    </div>
  );
};
