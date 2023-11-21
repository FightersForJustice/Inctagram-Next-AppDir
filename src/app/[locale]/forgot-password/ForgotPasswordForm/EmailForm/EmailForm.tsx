import { usePlaceholder } from '@/utils/usePlaceholder';
import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { FieldError, UseFormGetValues, UseFormRegister } from 'react-hook-form';

type Props = {
  translate: (value: string) => ReactNode;
  register: UseFormRegister<{ email: string }>;
  error: FieldError | undefined;
  errorMessage: string | undefined;
  registerName: 'email';
};

export const EmailForm: React.FC<Props> = ({
  translate,
  errorMessage,
  error,
  register,
  registerName,
}) => {
  return (
    <div>
      <div className={' text-left text-[--light-900] text-[14px] font-normal'}>
        <label>{translate('email')}</label>
      </div>
      <div className={'relative'}>
        <input
          {...register(registerName)}
          placeholder={usePlaceholder(registerName)}
          className={clsx(
            ' relative bg-transparent border-1 py-[5px] px-[12px] outline-none rounded-md border-[--dark-100] text-[--light-100] w-[100%] mb-[15px]',
            { 'border-red-700': error }
          )}
        />
        {error && (
          <p className={'absolute top-[40px] text-[--danger-500] text-[12px]'}>
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};
