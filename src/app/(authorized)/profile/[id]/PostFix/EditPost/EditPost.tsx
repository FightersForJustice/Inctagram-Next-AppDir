import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

import { PrimaryBtn } from 'src/components/Buttons/PrimaryBtn';
import { useUpdatePostMutation } from '@/api';
import { Loader } from '@/components/Loader';

import s from './EditPost.module.scss';
import Cookies from 'js-cookie';

type Props = {
  setEditPost: (value: boolean) => void;
  description: string;
  postId: number | undefined;
  setShowDots: (value: boolean) => void;
};

export const EditPost = ({
  setEditPost,
  description,
  postId,
  setShowDots,
}: Props) => {
  const [textareaLength, setTextareaLength] = useState(0);
  const [textareaValue, setTextareaValue] = useState(description);

  const accessToken = Cookies.get('accessToken');

  const [updatePost, { isLoading }] = useUpdatePostMutation();

  const onTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.value.length > 500) return;
    setTextareaLength(e.currentTarget.value.length);
    setTextareaValue(e.currentTarget.value);
  };

  const onSave = () => {
    if (accessToken)
      updatePost({
        postId: postId!,
        description: textareaValue,
        accessToken: accessToken,
      })
        .unwrap()
        .then(() => {
          setEditPost(false);
          setShowDots(true);
          toast.success('Post was updated');
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
        <p
          style={{
            color: `${textareaLength > 499 ? 'red' : '#8D9094'}`,
            textAlign: 'right',
            fontSize: '12px',
          }}
        >
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
