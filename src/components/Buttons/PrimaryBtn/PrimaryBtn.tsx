import { MouseEventHandler, ReactNode } from 'react';
import clsx from 'clsx';

import s from './PrimaryBtn.module.scss';

type Props = {
  isFullWidth?: boolean;
  type?: 'submit';
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isInsideLabel?: boolean;
};

export const PrimaryBtn = ({
  isFullWidth,
  children,
  disabled,
  onClick,
  type,
  className,
  isInsideLabel
}: Props) => {
  const classNames = clsx(s.primaryBtn, className, {
    [s.primaryBtnFullWidth]: isFullWidth,
    [s.primaryBtnIsInsideLabel]: isInsideLabel,
  });
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
