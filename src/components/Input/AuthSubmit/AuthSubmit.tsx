import React, { FC } from 'react';
import s from './AuthSubmit.module.scss';

type Props = {
  id?: string;
  value: string;
  error: string;
  disabled: boolean;
};
export const AuthSubmit: FC<Props> = ({ id, value, disabled, error }) => {
  const submitType: any = {
    "sign-up-submit" : s.signUp,
    "sign-in-submit" : s.signIn,
  }
  const finalStyle = id && submitType[id] ? submitType[id] : ""
  console.log(error)
  const errorStyle = error ? s.errorSubmit : ""

  return (
    <input
      type="submit"
      className={s.submit + " " + finalStyle + " " + errorStyle}
      id={id}
      value={value}
      disabled={disabled}
    />
  );
};
