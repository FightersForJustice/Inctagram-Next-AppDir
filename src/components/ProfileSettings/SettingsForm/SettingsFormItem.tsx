import React, { ReactNode } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

import s from './SettingsForm.module.scss';

type Props = {
  translate: (value: string) => ReactNode;
  id: string;
  register: UseFormRegister<any>;
  error: FieldError | undefined;
  errorMessage: string | undefined;
  registerName: string;
  translateName: string;
  defaultValue?: string;
};

export const SettingsFormItem: React.FC<Props> = ({
  translate,
  id,
  register,
  errorMessage,
  error,
  registerName,
  translateName,
  defaultValue,
}) => {
  return (
    <div className={s.form__itemWrapper}>
      <label htmlFor={id} className={s.form__label}>
        {translate(translateName)}
        <span className={s.form__required}>*</span>
      </label>
      <input
        defaultValue={defaultValue}
        id={id}
        {...register(registerName)}
        className={`${error ? s.form__textInput__error : s.form__textInput}`}
      />
      {error && <p className={s.form__error}>{errorMessage}</p>}
    </div>
  );
};
