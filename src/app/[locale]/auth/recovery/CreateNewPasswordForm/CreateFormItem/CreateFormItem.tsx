import { ReactNode } from 'react';
import { ShowHidePass } from '@/components/ShowHidePass';
import { FieldError, UseFormRegister } from 'react-hook-form';
import s from './CreateFormItem.module.scss';
import clsx from 'clsx';
import { usePlaceholder } from '@/utils/usePlaceholder';

type Props = {
  translate: (value: string) => ReactNode;
  register: UseFormRegister<any>;
  showValue: boolean;
  setShowCallback: (value: boolean) => void;
  error: FieldError | undefined;
  errorMessage: string | undefined;
  translateName: string;
  registerName: string;
};

export const CreateFormItem = ({
  errorMessage,
  error,
  register,
  registerName,
  translateName,
  translate,
  setShowCallback,
  showValue,
}: Props) => {
  const inputStyle = clsx(s.input, { [s.error]: error });
  const containerStyle = clsx(s.container, { [s.containerTop]: translateName === "password" });
  const errorStyle = clsx(s.errorMessage, { [s.errorMessagePassword]: translateName === "password" });
  return (
    <div className={containerStyle}>
      <div className={s.text}>
        <label>{translate(translateName)}</label>
      </div>
      <div className={s.inputContainer}>
        <input
          {...register(registerName)}
          placeholder={usePlaceholder(registerName)}
          type={`${!showValue ? 'text' : 'password'}`}
          className={inputStyle}
        />
        <ShowHidePass show={showValue} setShow={setShowCallback} />
        {error && <p className={errorStyle}>{errorMessage}</p>}
      </div>
    </div>
  );
};
