import { MouseEventHandler, ReactNode } from 'react';
import clsx from 'clsx';

import s from './PrimaryBtn.module.scss';

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
