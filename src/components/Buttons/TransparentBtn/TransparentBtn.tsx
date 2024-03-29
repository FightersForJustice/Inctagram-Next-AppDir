import clsx from 'clsx';
import React, { MouseEventHandler, ReactNode } from 'react';
import { Tooltip } from 'react-tooltip';

import s from './TransparentBtn.module.scss';
type Props = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  style?: Object;
  className?: string;
  isFullWidth?: boolean;
  isDisabled?: boolean;
  tooltipText?: string;
};

export const TransparentBtn: React.FC<Props> = ({
  children,
  onClick,
  style,
  className,
  isFullWidth = false,
  isDisabled = false,
  tooltipText = '',
}) => {
  return (
    <>
      <button
        className={clsx(
          s.transparentBtn,
          {
            [s.transparentBtnFullWidth]: isFullWidth,
            [s.transparentBtnDisabled]: isDisabled,
          },
          className
        )}
        disabled={isDisabled}
        onClick={onClick}
        style={style}
        data-tooltip-id="my-tooltip"
        data-tooltip-content={tooltipText}
      >
        {children}
      </button>
      {isDisabled && tooltipText && (
        <Tooltip place="bottom" variant="info" id="my-tooltip" />
      )}
    </>
  );
};
