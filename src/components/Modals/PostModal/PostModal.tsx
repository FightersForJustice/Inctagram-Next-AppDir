import { MouseEventHandler, ReactNode } from 'react';
import s from './PostModal.module.scss';

type Props = {
  children?: ReactNode;
  onClose?: MouseEventHandler<HTMLDivElement>;
  width?: string;
};

export const PostModal = ({ children, width, onClose }: Props) => {
  return (
    <div className={s.post__modal} onClick={onClose}>
      <div
        className={s.post__modal__content}
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={s.post__modal__header}>
          <div className={s.post__modal__body}>{children}</div>
        </div>
      </div>
    </div>
  );
};
