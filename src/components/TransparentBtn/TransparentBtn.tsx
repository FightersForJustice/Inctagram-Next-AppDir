import React, { ReactNode } from "react";
import s from "./TransparentBtn.module.scss";

type Props = {
    children: ReactNode;
};

export const TransparentBtn: React.FC<Props> = ({ children }) => {
    return <button className={s.transparentBtn}>{children}</button>;
};
