import React, { ReactNode } from 'react';
import { ShowHidePass } from '@/components/ShowHidePass';
import { FieldError, UseFormRegister } from 'react-hook-form';

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
  return (
    <div className={`${marginTop} ${marginBottom}`}>
      <div className={'text-left ml-5 text-[--light-900] text-[14px]'}>
        <label>{translate(translateName)}</label>
      </div>
      <div className={'relative'}>
        <input
          {...register(registerName)}
          placeholder={placeholder}
          type={`${!showValue ? 'text' : 'password'}`}
          className={`text-[14px] relative bg-transparent border-1 pt-[5px] pl-[12px] pb-[5px] pr-[12px] outline-none rounded-md border-[--dark-100] text-[--light-900] w-[90%] ${
            error ? 'border-red-700' : ''
          }`}
        />
        <ShowHidePass show={showValue} setShow={setShowCallback} />
        {error && (
          <p className={'absolute left-[5%] text-[--danger-500] text-[11px]'}>
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};
