import React, { MouseEventHandler, ReactNode } from 'react';
import s from './TransparentBtn.module.scss';

type Props = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  style?: Object;
};

export const TransparentBtn: React.FC<Props> = ({
  children,
  onClick,
  style,
}) => {
  return (
    <button className={s.transparentBtn} onClick={onClick} style={style}>
      {children}
    </button>
  );
};
