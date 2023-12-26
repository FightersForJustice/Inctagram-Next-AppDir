import clsx from 'clsx';

import s from './InputError.module.scss';

export const setStyle = (id: string, error: string, value: boolean) => {
  const signUpStyle = clsx(
    s.container,
    {
      [s.containerSignUp]:
        id === 'sign-up-passwordConfirm' || id === 'sign-up-password',
    },
    {
      [s.containerSignUpCheckbox]: id === 'sign-up-agreements',
    },
    {
      [s.containerAbsolute]: error && value,
    }
  );
  return signUpStyle;
};

export const errorStyle = (message: string | undefined) => {
  const boilerPlate = [
    'Password must contain 0-9, a-z, A-Z ',
    'Пароль должен содержать 0-9, a-z, A-Z ',
  ];
  return boilerPlate.includes(message ? message : '');
};
