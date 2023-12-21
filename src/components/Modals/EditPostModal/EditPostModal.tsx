import { PropsWithChildren } from 'react';
import Image from 'next/image';

import style from './EditPostModal.module.css';

type Props = {
  title?: string;
  onClose?: () => void;
  width?: string;
  isOkBtn?: boolean;
};

export const EditPostModal = ({
  onClose,
  title,
  children,
  width,
  isOkBtn,
}: PropsWithChildren<Props>) => {
  return (
    <div className={style.modal} onClick={onClose}>
      <div
        className={style.modal__content}
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={style.modal__header}>
          <div className={style.modal__title}>{title}</div>
          <Image
            className={style.modal__close}
            src={'/img/close.svg'}
            alt={'close'}
            width={24}
            height={24}
            onClick={onClose}
          />
        </div>
        <div className={style.modal__body}>{children}</div>
        {isOkBtn && (
          <div className={style.modal__footer}>
            <button className={style.modal__btn} onClick={onClose}>
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
