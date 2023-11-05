import React, { ReactNode } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

type Props = {
  translate: (value: string) => ReactNode;
  register: UseFormRegister<{ email: string }>;
  error: FieldError | undefined;
  errorMessage: string | undefined;
};

export const EmailForm: React.FC<Props> = ({
  translate,
  errorMessage,
  error,
  register,
}) => {
  return (
    <div className={' mt-[18px]'}>
      <div
        className={
          ' text-left ml-5 text-[--light-900] text-[14px] font-extrabold'
        }
      >
        <label>{translate('email')}</label>
      </div>
      <div className={'relative'}>
        <input
          {...register('email')}
          className={`relative bg-transparent border-1 pt-[5px] pl-[12px] pb-[5px] pr-[12px] outline-none rounded-md border-[--dark-100] text-[--light-900] w-[90%] mb-[15px] ${
            error ? 'border-red-700' : ''
          }`}
        />
        {error && (
          <p
            className={
              'absolute left-[20px] top-[35px] text-[--danger-500] text-[11px]'
            }
          >
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};
