import React, { MouseEventHandler, ReactNode } from 'react';
import s from './PrimaryBtn.module.scss';
import clsx from 'clsx';

type Props = {
  type?: 'submit';
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const PrimaryBtn = ({
  children,
  disabled,
  onClick,
  type,
  className,
}: Props) => {
  const classNames = clsx(s.primaryBtn, className);
  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
