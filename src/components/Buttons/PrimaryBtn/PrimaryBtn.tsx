import React, { MouseEventHandler, ReactNode } from 'react';
import s from './PrimaryBtn.module.scss';

type Props = {
  type?: "submit"
  children: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const PrimaryBtn = ({ children, disabled, onClick, type }: Props) => {
  return (
    <button type={type} className={s.primaryBtn} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
