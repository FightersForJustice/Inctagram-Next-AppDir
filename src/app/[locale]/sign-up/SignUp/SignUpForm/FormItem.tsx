import React from 'react';
import s from './FormItem.module.scss';
import { InputError } from './InputError';
import { ShowHidePass } from '@/components/ShowHidePass';
import { FormItemProps } from './typesSignUp';
import { usePlaceholder } from '@/utils/usePlaceholder';
import clsx from 'clsx';

export const FormItem: React.FC<FormItemProps> = ({
  errorMessage,
  error,
  register,
  marginTop,
  translate,
  registerName,
  translateName,
  marginBottom,
  id,
  show,
  setShow,
  showPasswordIcon,
}) => {
  const type = showPasswordIcon !== undefined && show;

  return (
    <div className={`${marginTop} ${marginBottom}`}>
      <div className={'text-left text-[--light-900] text-[14px]'}>
        <label>{translate(translateName)}</label>
      </div>
      <div className={'relative'}>
        <input
          {...register(registerName)}
          className={clsx(s.input, { [s.error]: error })}
          id={id}
          placeholder={usePlaceholder(registerName)}
          type={`${!type ? 'text' : 'password'}`}
        />
        {showPasswordIcon && <ShowHidePass show={show!} setShow={setShow!} />}

        <InputError error={error} errorMessage={errorMessage} id={id} />
      </div>
    </div>
  );
};
