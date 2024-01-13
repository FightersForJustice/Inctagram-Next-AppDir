import s from './ProfileInfo.module.scss';
export const ProfileInfo = () => {
  return (
    <>
      <div>
        <div className={s.avatar}>
          <div>
            <div className={s.img}></div>
          </div>
          <div className={s.name}></div>
        </div>
        <div className={s.indicators}>
          <div>
            <p></p>
            <p></p>
          </div>
          <div>
            <p></p>
            <p></p>
          </div>
          <div>
            <p></p>
            <p></p>
          </div>
        </div>
        <div className={s.btn}>
          <div className={s.settings}></div>
        </div>
        <div className={s.descriptions}>
          <div className={s.text}></div>
          <div className={s.text}></div>
          <div className={s.text}></div>
        </div>
      </div>
    </>
  );
};
