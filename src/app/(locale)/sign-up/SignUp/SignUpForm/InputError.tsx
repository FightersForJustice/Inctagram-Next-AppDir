import { InputErrorProps } from './typesSignUp';
import s from './InputError.module.scss';
import clsx from 'clsx';
import { dictionary } from '@/features/data/passwordSymbols';

export const InputError = ({ errorMessage, error, id }: InputErrorProps) => {
  const signUpStyle = clsx(
    s.container,
    {
      [s.containerSignUp]: id === 'sign-up-passwordConfirm',
    },
    {
      [s.containerSignUpBottom]: id === 'sign-up-password',
    },
    {
      [s.containerSignUpCheckbox]: id === 'sign-up-agreements',
    }
  );
  return (
    error && (
      <p className={signUpStyle} id={id}>
        {errorMessage}{' '}
        {error.message === 'Password must contain 0-9, a-z, A-Z ' && dictionary}
      </p>
    )
  );
};
