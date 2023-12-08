import React, { FC } from 'react';
import s from './AuthSubmit.module.scss';

type Props = {
  id?: string;
  value: string;
  disabled: boolean;
};
export const AuthSubmit: FC<Props> = ({ id, value, disabled }) => {
  const finalStyle = id === 'sign-up-submit' ? s.submit + " " + s.signUp : s.submit
  return (
    <input
      type="submit"
      className={finalStyle}
      id={id}
      value={value}
      disabled={disabled}
    />
  );
};
