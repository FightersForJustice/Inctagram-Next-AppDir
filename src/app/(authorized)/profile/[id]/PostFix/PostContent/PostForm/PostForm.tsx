import { useTranslation } from 'react-i18next';
import s from '../PostContent.module.scss';

export const PostForm = () => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`CreatePost.EditPost.${key}`);
  return (
    <div className={s.post__form}>
      <input
        className={s.post__form__input}
        type="text"
        placeholder={translate('addComment') + '...'}
      />
      <button className={s.post__form__btn}>{translate('publish')}</button>
    </div>
  );
};
