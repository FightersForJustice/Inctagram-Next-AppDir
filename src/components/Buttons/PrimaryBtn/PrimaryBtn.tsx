import React, { MouseEventHandler, ReactNode } from 'react';
import s from './PrimaryBtn.module.scss';

type Props = {
  children: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const PrimaryBtn = ({ children, disabled, onClick }: Props) => {
  return (
    <button className={s.primaryBtn} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
