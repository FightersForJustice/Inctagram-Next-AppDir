import { usePlaceholder } from '@/utils/usePlaceholder';
import s from './EmailForm.module.scss';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

type Props = {
  translate: (value: string) => string;
  translateErrors: (value: string) => string;
  register: UseFormRegister<{ email: string }>;
  error: FieldError | undefined;
  errorMessage: string | undefined;
  registerName: 'email';
};

export const EmailForm = ({
  translate,
  translateErrors,
  errorMessage,
  error,
  register,
  registerName,
}: Props) => {
  return (
    <div className={s.inputContainer}>
      <div className={s.container}>
        <label>{translate('email')}</label>
      </div>
      <div className={'relative'}>
        <input
          {...register(registerName)}
          placeholder={usePlaceholder(registerName)}
          className={clsx([s.input], { [s.error]: error })}
        />
        {error && (
          <p className={s.errorMessage}>
            {errorMessage && translateErrors(errorMessage)}
          </p>
        )}
      </div>
    </div>
  );
};
