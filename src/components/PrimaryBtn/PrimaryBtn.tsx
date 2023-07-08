import React, { MouseEventHandler, ReactNode } from "react";
import s from "./PrimaryBtn.module.scss";

type Props = {
  children: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const PrimaryBtn: React.FC<Props> = ({ children, disabled, onClick }) => {
  return (
    <button className={s.primaryBtn} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
