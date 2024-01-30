import { ShowHidePass } from '@/components/ShowHidePass';
import { FieldError, UseFormRegister } from 'react-hook-form';
import clsx from 'clsx';
import { usePlaceholder } from '@/utils/usePlaceholder';
import { dictionary } from '@/features/data/passwordSymbols';
import { useTranslation } from 'react-i18next';
import s from './CreateFormItem.module.scss';

type Props = {
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
  setShowCallback,
  showValue,
}: Props) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`RecoveryPage.${key}`);
  const inputStyle = clsx(s.input, { [s.error]: error });
  const containerStyle = clsx(s.container, {
    [s.containerTop]: translateName === 'password',
  });
  const errorStyle = clsx(s.errorMessage, {
    [s.errorMessagePassword]: translateName === 'password',
  });
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
        {error && (
          <p className={errorStyle}>
            {errorMessage}
            {error.message === 'Password must contain 0-9, a-z, A-Z ' &&
              dictionary}
          </p>
        )}
      </div>
    </div>
  );
};
