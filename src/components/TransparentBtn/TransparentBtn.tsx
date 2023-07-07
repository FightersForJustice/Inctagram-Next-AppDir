import React, { MouseEventHandler, ReactNode } from "react";
import s from "./TransparentBtn.module.scss";

type Props = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const TransparentBtn: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button className={s.transparentBtn} onClick={onClick}>
      {children}
    </button>
  );
};
