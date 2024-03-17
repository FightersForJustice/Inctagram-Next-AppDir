import { ChangeEvent, useState } from 'react';

import { PrimaryBtn } from 'src/components/Buttons/PrimaryBtn';
import s from './EditPost.module.scss';
import { updatePost } from '@/app/(authorized)/profile/[id]/actions';
import { toast } from 'react-toastify';

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
  const [textareaLength, setTextareaLength] = useState(description.length);
  const [textareaValue, setTextareaValue] = useState(description);

  const onTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.value.length > 500) return;
    setTextareaLength(e.currentTarget.value.length);
    setTextareaValue(e.currentTarget.value);
  };

  const onSave = (formData: FormData) => {
    if (postId) {
      updatePost(
         postId,
         formData
      ).then(() => {
        setEditPost(false);
        setShowDots(false);
        toast.success('Post Updated');
      });
    }
  };

  return (
    <form action={onSave} className={s.post}>
      <p className={s.post__title}>Add publication descriptions</p>
      <textarea
        className={s.post__textarea}
        name={'description'}
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
        <PrimaryBtn>Save Changes</PrimaryBtn>
      </div>
    </form>
  );
};
