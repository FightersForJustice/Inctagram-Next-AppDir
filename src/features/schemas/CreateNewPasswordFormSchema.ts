import { useTranslations } from 'next-intl';
import * as yup from 'yup';

export const CreateNewPasswordFormSchema = () => {
  const t = useTranslations('Errors');

  const passwordValidationRegex =
    /^[A-Za-z0-9!"@#$%^&*'()_+{}\[\]:;<>,.?~\-=/\\|]+$/;

  return yup
    .object({
      password: yup
        .string()
        .required(t('password.required'))
        .test('not-only-spaces', t('password.spaces'), (value) => {
          // Проверяем, что пароль не состоит только из пробелов
          return value.trim() !== '';
        })
        .test('no-inner-spaces', t('password.spaces'), (value) => {
          // Проверяем, что пароль не содержит пробелов внутри
          return !/\s/.test(value);
        })
        .matches(passwordValidationRegex, t('password.invalidCharacters'))
        .min(6, t('password.min'))
        .max(20, t('password.max')),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password')], t('passwordConfirm.oneOf'))
        .min(6, t('passwordConfirm.min'))
        .required(t('passwordConfirm.required')),
    })

    .required();
};
