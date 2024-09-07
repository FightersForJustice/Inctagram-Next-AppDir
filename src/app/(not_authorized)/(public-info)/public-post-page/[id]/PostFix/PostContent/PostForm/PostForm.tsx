import { useTranslation } from 'react-i18next';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import s from '../PostContent.module.scss';

export const PostForm = ({
  onSubmit,
}: {
  onSubmit: (data: { value: string; isAnswer: boolean }) => void;
}) => {
  const [value, setValue] = useState('');
  const { t } = useTranslation();
  const translate = (key: string): string => t(`CreatePost.EditPost.${key}`);

  const sendComment = () => {
    if (value.trim() && value.length < 300)
      onSubmit({ value: value, isAnswer: false });
      setValue('');
  };

  const onInputChange = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      sendComment();
    }
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  return (
    <div className={s.post__form}>
      <div className="flex">
        <input
          className={s.post__form__input}
          value={value}
          type="text"
          onKeyUp={onInputChange}
          onChange={onChange}
          placeholder={translate('addComment') + '...'}
          style={{
            border: value.length > 300 ? '1px solid var(--danger-500)' : '',
          }}
        />
        <button className={s.post__form__btn} onClick={sendComment}>
          {translate('publish')}
        </button>
      </div>
      {value.length > 300 && (
        <span
          className="text-sm pt-1 font-light text-red"
          style={{ color: 'var(--danger-500)' }}
        >
          {' '}
          длина сообщения превышает 300 символов
        </span>
      )}
    </div>
  );
};
