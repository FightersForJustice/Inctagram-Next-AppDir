import * as yup from 'yup';
import {
  emailValidationRegex,
  passwordValidationRegex,
} from './validationRegex';

export type SignInData = {
  email: string;
  password: string;
  userName?: string;
};

export const SignInSchema = () => {
  return yup
    .object({
      email: yup
        .string()
        .matches(emailValidationRegex, 'email.invalidCharacters')
        .email('email.email')
        .required('email.required')
        .test('valid-domain', 'email.invalidCharacters', (value) => {
          const parts = value.split('@');
          if (parts.length === 2) {
            const [, domain] = parts;
            return domain.includes('.');
          }
          return false;
        }),
      password: yup
        .string()
        .required('password.required')
        .test('not-only-spaces', 'password.spaces', (value) => {
          // Проверяем, что пароль не состоит только из пробелов
          return value.trim() !== '' && !/\s/.test(value);
        })
        .matches(
          passwordValidationRegex,
          'password.invalidCharacters'
        )
        .min(6, 'password.min')
        .max(20, 'password.max'),
    })
    .required();
};
