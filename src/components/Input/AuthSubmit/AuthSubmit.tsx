import React, { FC } from 'react';
import s from './AuthSubmit.module.scss';

type Props = {
  id?: string;
  value: string;
  disabled: boolean;
};
export const AuthSubmit: FC<Props> = ({ id, value, disabled }) => {
  const submitType: any = {
    "sign-up-submit" : s.signUp,
    "sign-in-submit" : s.signIn,
  }
  const finalStyle = id && submitType[id] ? submitType[id] : ""

  return (
    <input
      type="submit"
      className={s.submit + " " + finalStyle}
      id={id}
      value={value}
      disabled={disabled}
    />
  );
};
