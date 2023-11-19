import React from 'react';
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
      <div className={'text-left ml-5 text-[--light-900] text-[14px]'}>
        <label>{translate(translateName)}</label>
      </div>
      <div className={'relative'}>
        <input
          {...register(registerName)}
          className={clsx(
            ' bg-transparent border-1 pt-[5px] pl-[12px] pb-[5px] pr-[12px] outline-none rounded-md border-[--dark-100] text-[--light-100] w-[90%]',
            { 'border-red-700': error }
          )}
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
