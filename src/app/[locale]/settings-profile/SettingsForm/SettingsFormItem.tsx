import React, { ReactNode } from "react";
import s from "./SettingsForm.module.scss";
import { FieldError, UseFormRegister } from "react-hook-form";

type Props = {
  translate: (value: string) => ReactNode;
  id: string;
  register: UseFormRegister<any>;
  error: FieldError | undefined;
  errorMessage: string | undefined;
  registerName: string;
  translateName: string;
  minLength: number;
  maxLength: number;
};

export const SettingsFormItem: React.FC<Props> = ({
  translate,
  id,
  register,
  errorMessage,
  error,
  registerName,
  translateName,
  maxLength,
  minLength,
}) => {
  return (
    <div className={s.form__itemWrapper}>
      <label className={s.form__label}>{translate(translateName)}</label>
      <input
        id={id}
        {...register(registerName, { required: true, minLength, maxLength })}
        className={`${error ? s.form__textInput__error : s.form__textInput}`}
      />
      {error && <p className={s.form__error}>{errorMessage}</p>}
    </div>
  );
};
