import { ReactNode, FC } from 'react';
import s from './FormItem.module.scss';
import clsx from 'clsx';

import { InputError } from './InputError';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { ShowHidePass } from '@/components/ShowHidePass';
import { usePlaceholder } from '@/utils/usePlaceholder';

export interface FormItemProps {
  marginTop: string;
  marginBottom?: string;
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
  placeholder?: string;
}

export const FormItem: FC<FormItemProps> = ({
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
  placeholder,
}) => {
  const type = showPasswordIcon !== undefined && show;
  const inputStyle = clsx(s.input, { [s.error]: error });

  return (
    <div className={`${marginTop} ${marginBottom}`} key={id}>
      <div className={'text-left text-[--light-900] text-[14px]'}>
        <label>{translate(translateName)}</label>
      </div>
      <div className={'relative'}>
        <input
          {...register(registerName)}
          className={inputStyle}
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
