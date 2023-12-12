import { ReactNode } from 'react';
import s from './FormItem.module.scss';
import clsx from 'clsx';

import { InputError } from './InputError';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { ShowHidePass } from '@/components/ShowHidePass';
import { usePlaceholder } from '@/utils/usePlaceholder';

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
  const inputTypes: any = {
    'sign-in-email-input': 'username',
    'sign-up-email': 'username',
    'sign-in-password-input': 'current-password',
    'sign-up-password': 'new-password',
    'sign-up-passwordConfirm': 'new-password',
  };

  const finalStyle =
    id.slice(0, 7) === 'sign-in' ? s.signInContainer : s.signInUpContainer;

  return (
    <div className={finalStyle} key={id}>
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

        <InputError error={error} errorMessage={errorMessage} id={id} />
      </div>
    </div>
  );
};
