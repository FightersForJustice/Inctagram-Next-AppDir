import React, { MouseEventHandler, ReactNode } from 'react';
import Image from 'next/image';
import './PostModal.css';

type Props = {
  children?: ReactNode;
  onClose?: MouseEventHandler<HTMLDivElement>;
  width?: string;
};

export const PostModal: React.FC<Props> = ({ children, width, onClose }) => {
  return (
    <div className={'post__modal'} onClick={onClose}>
      <div
        className={'post__modal__content'}
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={'post__modal__header'}>
          <div className={'post__modal__body'}>{children}</div>
        </div>
      </div>
    </div>
  );
};
