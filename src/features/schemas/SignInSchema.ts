import * as yup from 'yup';
import {
  emailValidationRegex,
  passwordValidationRegex,
} from './validationRegex';
import { useTranslation } from 'react-i18next';

export type SignInData = {
  email: string;
  password: string;
  userName?: string;
};

export const SignInSchema = () => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`Errors.${key}`);
  return yup
    .object({
      email: yup
        .string()
        .matches(emailValidationRegex, translate('email.invalidCharacters'))
        .email(translate('email.email'))
        .required(translate('email.required'))
        .test('valid-domain', translate('email.invalidCharacters'), (value) => {
          const parts = value.split('@');
          if (parts.length === 2) {
            const [, domain] = parts;
            return domain.includes('.');
          }
          return false;
        }),
      password: yup
        .string()
        .required(translate('password.required'))
        .test('not-only-spaces', translate('password.spaces'), (value) => {
          // Проверяем, что пароль не состоит только из пробелов
          return value.trim() !== '' && !/\s/.test(value);
        })
        .matches(
          passwordValidationRegex,
          translate('password.invalidCharacters')
        )
        .min(6, translate('password.min'))
        .max(20, translate('password.max')),
    })
    .required();
};
