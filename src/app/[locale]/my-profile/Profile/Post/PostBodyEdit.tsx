import React, { ChangeEvent, useState } from "react";
import style from "./Post.module.scss";
import { TransparentBtn } from "../../../../../components/TransparentBtn/TransparentBtn";
import { useForm } from "react-hook-form";

import { PutPostPayloadData, useDeletePostMutation, usePutPostMutation } from "../../../../../api/posts.api";
import { Modal } from "../../../../../components/Modal/Modal";

type PropsType = {
  refetch: () => void;
  setOpen: (value: boolean) => void;
  avatar?: string;
  userName?: string;
  description?: string;
  uploadId?: number;
};
export const PostBodyEdit = ({ avatar, userName, description, uploadId, setOpen, refetch }: PropsType) => {
  const [value, setValue] = useState<string>(description ?? "");
  const [setPost] = usePutPostMutation();
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
    console.log(data);
    const reqPayload: PutPostPayloadData = {
      description: data.description,
      postId: uploadId ?? 0,
    };
    await setPost(reqPayload);
    refetch();
    setOpen(false);
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
        <form onSubmit={handleSubmit(onSubmit)} className={style.postBodyEdit_form}>
          <div className={style.postBodyEdit_form_text}>
            <p>Text-area with title</p>
            {
              <textarea
                {...register("description")}
                value={value}
                onChange={setNewValue}
                className={style.postBodyEdit_textarea}
              ></textarea>
            }
          </div>
          <div className={style.postBodyEdit_btn}>
            <TransparentBtn onClick={handleSubmit(onSubmit)}>Save Changes</TransparentBtn>
          </div>
        </form>
      </div>
    </div>
  );
};
