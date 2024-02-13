import s from '../PostContent.module.scss';

export const PostForm = () => {
  return (
    <div className={s.post__form}>
      <input
        className={s.post__form__input}
        type="text"
        placeholder={'Add a Comment...'}
      />
      <button className={s.post__form__btn}>Publish</button>
    </div>
  );
};
