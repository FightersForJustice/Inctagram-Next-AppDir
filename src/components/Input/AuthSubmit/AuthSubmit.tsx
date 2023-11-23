import React, { FC } from 'react';
import s from './AuthSubmit.module.scss';

type Props = {
  id?: string;
  value: string;
  disabled: boolean;
};
export const AuthSubmit: FC<Props> = ({ id, value, disabled }) => {
  return (
    <input
      type="submit"
      className={s.submit}
      id={id}
      value={value}
      disabled={disabled}
    />
  );
};
