import React, { ReactNode } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

type Props = {
  translate: (value: string) => ReactNode;
  register: UseFormRegister<{ email: string }>;
  error: FieldError | undefined;
  errorMessage: string | undefined;
  placeholder?: string;
};

export const EmailForm: React.FC<Props> = ({
  translate,
  errorMessage,
  error,
  register,
  placeholder,
}) => {
  return (
    <div>
      <div className={' text-left text-[--light-900] text-[14px] font-normal'}>
        <label>{translate('email')}</label>
      </div>
      <div className={'relative'}>
        <input
          {...register('email')}
          placeholder={placeholder}
          className={`relative bg-transparent border-1 py-[5px] px-[12px] outline-none rounded-md border-[--dark-100] text-[--light-900] w-[100%] mb-[15px] ${
            error ? 'border-red-700' : ''
          }`}
        />
        {error && (
          <p className={'absolute top-[40px] text-[--danger-500] text-[11px]'}>
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};
