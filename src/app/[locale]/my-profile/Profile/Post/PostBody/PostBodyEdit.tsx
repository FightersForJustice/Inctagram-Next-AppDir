"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import style from "../Post.module.scss";
import { TransparentBtn } from "src/components/Buttons/TransparentBtn";
import { useForm } from "react-hook-form";
import { useUpdatePostMutation } from "@/api";

type PropsType = {
  setOpen: (value: boolean) => void;
  avatar?: string;
  userName?: string;
  description?: string;
  uploadId?: number;
  refetch?: any;
};
export const PostBodyEdit = ({ avatar, userName, description, uploadId, setOpen, refetch }: PropsType) => {
  const [value, setValue] = useState<string>(description ?? "");
  const [error, setError] = useState("");
  const [setPost] = useUpdatePostMutation();
  const setNewValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm({});

  const onSubmit = async (data: any) => {
    if (value.length >= 500) {
      setError("your post is too long");
      return;
    }
    const reqPayload: { postId: number; description: string } = {
      description: data.description,
      postId: uploadId ?? 0,
    };
    await setPost(reqPayload);
    refetch();
    setOpen(false);
  };

  useEffect(() => {
    if (value.length <= 500) {
      setError("");
    }
  }, [value]);

  return (
    <div className={style.post_container_info}>
      <div className={style.post_container_info_header}>
        <div className={style.post_container_info_header_userData}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatar} alt="err" className={style.container_info_header_avatar_img} />
          <span>{userName}</span>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className={style.postBodyEdit_form}>
          <div className={style.postBodyEdit_form_text}>
            <p>Edit your post:</p>
            {
              <textarea
                {...register("description")}
                value={value}
                onChange={setNewValue}
                className={style.postBodyEdit_textarea}
              ></textarea>
            }
            {error.length > 0 ? <p style={{ color: "red" }}>{error}</p> : ""}
            <p>{value.length} / 500</p>
          </div>
          <div className={style.postBodyEdit_btn}>
            <TransparentBtn onClick={handleSubmit(onSubmit)}>Save Changes</TransparentBtn>
          </div>
        </form>
      </div>
    </div>
  );
};
