import React, { ReactNode } from 'react';
import { ShowHidePass } from '@/components/ShowHidePass';
import { FieldError, UseFormRegister } from 'react-hook-form';
import s from './CreateFormItem.module.scss';
import clsx from 'clsx';

type Props = {
  marginTop: string;
  marginBottom?: string;
  translate: (value: string) => ReactNode;
  register: UseFormRegister<any>;
  showValue: boolean;
  setShowCallback: (value: boolean) => void;
  error: FieldError | undefined;
  errorMessage: string | undefined;
  translateName: string;
  registerName: string;
  placeholder?: string;
};

export const CreateFormItem: React.FC<Props> = ({
  errorMessage,
  error,
  register,
  registerName,
  translateName,
  marginBottom,
  translate,
  setShowCallback,
  showValue,
  marginTop,
  placeholder,
}) => {
  const inputStyle = clsx(s.input, { [s.error]: error });
  return (
    <div className={`${marginTop} ${marginBottom}`}>
      <div className={s.text}>
        <label>{translate(translateName)}</label>
      </div>
      <div className={'relative'}>
        <input
          {...register(registerName)}
          placeholder={placeholder}
          type={`${!showValue ? 'text' : 'password'}`}
          className={inputStyle}
        />
        <ShowHidePass show={showValue} setShow={setShowCallback} />
        {error && <p className={s.errorMessage}>{errorMessage}</p>}
      </div>
    </div>
  );
};
