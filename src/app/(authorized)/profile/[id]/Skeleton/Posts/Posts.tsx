import s from './Posts.module.scss';

export const Posts = () => {
  const elementsArray = Array(8).fill(null);
  return (
    <>
      <div className={s.posts}>
        {elementsArray.map((_, index) => (
          <div key={index} className={s.imageContainer}></div>
        ))}
      </div>
    </>
  );
};
