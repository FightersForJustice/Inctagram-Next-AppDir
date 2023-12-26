import clsx from 'clsx';

import { InputErrorProps } from '@/types/signUpTypes';
import { dictionary } from '@/features/data/passwordSymbols';
import { errorStyle, setStyle } from './utils';

import s from './InputError.module.scss';

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
      <p
        className={useStyle(id, error.toString(), id.slice(0, 7) === 'sign-in')}
        id={id}
      >
        {errorMessage} {errorStyle(error.message) && dictionary}
      </p>
    )
  );
};
