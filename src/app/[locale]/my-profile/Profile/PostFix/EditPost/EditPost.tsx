import React, { ChangeEvent, useState } from "react";

import s from "./EditPost.module.scss";
import { PrimaryBtn } from "src/components/Buttons/PrimaryBtn";
import { useUpdatePostMutation } from "@/api";
import { toast } from "react-toastify";
import { Loader } from "@/components/Loader";

type Props = {
  setEditPost: (value: boolean) => void;
  description: string;
  postId: number | undefined;
  setShowDots: (value: boolean) => void;
};

export const EditPost: React.FC<Props> = ({ setEditPost, description, postId, setShowDots }) => {
  const [textareaLength, setTextareaLength] = useState(0);
  const [textareaValue, setTextareaValue] = useState(description);

  const [updatePost, { isLoading }] = useUpdatePostMutation();

  const onTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.value.length > 500) return;
    setTextareaLength(e.currentTarget.value.length);
    setTextareaValue(e.currentTarget.value);
  };

  const onSave = () => {
    updatePost({ postId: postId!, description: textareaValue })
      .unwrap()
      .then(() => {
        setEditPost(false);
        setShowDots(true);
        toast.success("Post was updated");
      });
  };

  return (
    <>
      <div className={s.post}>
        <p className={s.post__title}>Add publication descriptions</p>
        <textarea
          className={s.post__textarea}
          cols={30}
          rows={10}
          maxLength={500}
          value={textareaValue}
          onChange={onTextareaHandler}
        />
        <p style={{ color: `${textareaLength > 499 ? "red" : "#8D9094"}`, textAlign: "right", fontSize: "12px" }}>
          {textareaLength} / 500
        </p>
        <div className={s.post__btn}>
          <PrimaryBtn onClick={onSave}>Save Changes</PrimaryBtn>
        </div>
      </div>
      {isLoading && <Loader />}
    </>
  );
};
