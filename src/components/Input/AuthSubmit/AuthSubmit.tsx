import clsx from 'clsx';
import s from './AuthSubmit.module.scss';

type Props = {
  id?: string;
  value: string;
  disabled: boolean;
  error?: string;
};
export const AuthSubmit = ({ id, value, disabled, error }: Props) => {
  const submitType: any = {
    'sign-up-submit': s.signUp,
    'sign-in-submit': s.signIn,
  };

  const inputStyle = clsx(
    s.submit,
    { [submitType[id ? id : '']]: id },
    { [s.errorSubmit]: error }
  );

  return (
    <input
      type="submit"
      className={inputStyle}
      id={id}
      value={value}
      disabled={disabled}
    />
  );
};
