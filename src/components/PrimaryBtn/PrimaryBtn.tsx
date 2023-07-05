import React, { ReactNode } from "react";
import s from "./PrimaryBtn.module.scss";

type Props = {
    children: ReactNode;
    disabled?: boolean
};

export const PrimaryBtn: React.FC<Props> = ({ children, disabled }) => {
    return <button className={s.primaryBtn} disabled={disabled}>{children}</button>;
};
