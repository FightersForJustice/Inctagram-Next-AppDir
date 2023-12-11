import { InputErrorProps } from './typesSignUp';
import s from './InputError.module.scss';
import clsx from 'clsx';

export const InputError = ({ errorMessage, error, id }: InputErrorProps) => {
  const signUpStyle = clsx(
    s.container,
    {
      [s.containerSignUp]:
        id === 'sign-up-passwordConfirm',
    },
    {
      [s.containerSignUpCheckbox]:
        id === 'sign-up-agreements',
    }
  );
  return (
    error && (
      <p className={signUpStyle} id={id}>
        {errorMessage}
      </p>
    )
  );
};
