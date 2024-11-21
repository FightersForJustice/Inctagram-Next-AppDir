import s from './DialogWindow.module.scss'
import Image from "next/image";

export const DialogWindow = () => {
    return (
        <div>
          <div className={s.header}>
            <Image
                src={'/img/create-post/no-image.png'}
                alt="avatar"
                width={48}
                height={48}
                className={s.avatar}
            />
            <div className={s.name}>Pasha</div>
          </div>
          <div>

          </div>
        </div>
    );
};
