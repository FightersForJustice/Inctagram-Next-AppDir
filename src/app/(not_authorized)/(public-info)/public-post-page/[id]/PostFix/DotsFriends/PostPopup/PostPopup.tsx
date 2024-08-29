import Image from 'next/image';
import s from './PostPopup.module.scss';

export const PostFriendsPopup = () => {
  return (
    <>
      <div className={s.popup}>
        <div className={s.popup__item}>
          <Image
            style={{
              cursor: 'pointer',
              filter:
                'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(133deg) brightness(100%) contrast(104%)',
            }}
            width={24}
            height={24}
            src="/img/person-add-outline.svg"
            alt=""
          />
          <p className={s.popup__item__name}>Follow</p>
        </div>
        <div className={s.popup__item}>
          <Image
            style={{
              cursor: 'pointer',
              filter:
                'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(133deg) brightness(100%) contrast(104%)',
            }}
            width={24}
            height={24}
            src="/img/copy-outline.svg"
            alt=""
          />
          <p className={s.popup__item__name}>Copy Link</p>
        </div>
      </div>
    </>
  );
};
