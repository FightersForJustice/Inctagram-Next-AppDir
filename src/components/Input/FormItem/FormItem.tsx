import { ReactNode } from 'react';
import clsx from 'clsx';
import { FieldError, UseFormRegister } from 'react-hook-form';

import { InputError } from '@/components/Input';
import { ShowHidePass } from '@/components/ShowHidePass';
import { usePlaceholder } from '@/utils/usePlaceholder';
import { inputTypes } from './utils';

import s from './FormItem.module.scss';
import {useTranslation} from "react-i18next";

export interface FormItemProps {
  translate: (value: string) => ReactNode;
  register: UseFormRegister<any>;
  error: FieldError | undefined;
  errorMessage: string | undefined;
  registerName: string;
  translateName: string;
  id: string;
  show?: boolean;
  setShow?: (value: boolean) => void;
  showPasswordIcon?: boolean;
  isTouched?: boolean;
}

export const FormItem = ({
  errorMessage,
  error,
  register,
  translate,
  registerName,
  translateName,
  id,
  show,
  setShow,
  showPasswordIcon,
}: FormItemProps) => {
  const type = showPasswordIcon !== undefined && show;
  const inputStyle = clsx(s.input, { [s.error]: error });
  const containerStyle = clsx(
    { [s.signUpContainer]: id.slice(0, 7) === 'sign-up' },
    { [s.signInContainer]: id.slice(0, 7) === 'sign-in' },
    { [s.signUpContainerBottom]: id === 'sign-up-passwordConfirm' },
    { [s.containerError]: error && id.slice(0, 7) === 'sign-up' },
    { [s.containerErrorSignIn]: error && id === 'sign-in-password-input' }
  );
  const { t } = useTranslation();
  const translateError = (key: string): string => t(`Errors.${key}`);

  return (
    <div className={containerStyle} key={id}>
      <div className={s.labelContainer}>
        <label>{translate(translateName)}</label>
      </div>
      <div className={s.inputContainer}>
        <input
          {...register(registerName)}
          className={inputStyle}
          id={id}
          placeholder={usePlaceholder(registerName)}
          type={`${!type ? 'text' : 'password'}`}
          autoComplete={inputTypes[id] ?? null}
        />
        {showPasswordIcon && <ShowHidePass show={show!} setShow={setShow!} />}

        <InputError error={error} errorMessage={errorMessage ? translateError(errorMessage) : ''} id={id} />
      </div>
    </div>
  );
};
