import { PropsWithChildren } from 'react';
import s from './Modal.module.scss';
import Image from 'next/image';

type Props = {
  title?: string;
  className?: string;
  onClose?: () => void;
  isOkBtn?: boolean;
};

export const Modal = ({
  onClose,
  title,
  children,
  className,
  isOkBtn,
}: PropsWithChildren<Props>) => {
  return (
    <div className={s.modal} onClick={onClose}>
      <div
        className={s.modal__content + " " + className}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={s.modal__header}>
          <div className={s.modal__title}>{title}</div>

          <Image
            className={s.modal__close}
            src={'/img/close.svg'}
            alt={'close'}
            width={24}
            height={24}
            onClick={onClose}
          />
        </div>
        <div className={s.modal__body}>{children}</div>
        {isOkBtn && (
          <div className={s.modal__footer}>
            <button className={s.modal__btn} onClick={onClose}>
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
