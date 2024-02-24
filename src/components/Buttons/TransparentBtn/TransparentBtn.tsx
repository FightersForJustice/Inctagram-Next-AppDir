import clsx from 'clsx';
import React, { MouseEventHandler, ReactNode } from 'react';
import s from './TransparentBtn.module.scss';
type Props = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  style?: Object;
  className?: string;
};

export const TransparentBtn: React.FC<Props> = ({
  children,
  onClick,
  style,
  className,
}) => {
  return (
    <button
      className={clsx(s.transparentBtn, className)}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};
