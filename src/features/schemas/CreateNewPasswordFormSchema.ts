import { useTranslations } from 'next-intl';
import * as yup from 'yup';

export const CreateNewPasswordFormSchema = () => {
  const t = useTranslations('Errors');

  const passwordCompletly =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\|])[A-Za-z0-9'"`!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\|]{6,20}$/;

  return yup
    .object({
      password: yup
        .string()
        .required(t('password.required'))
        .test('not-spaces', t('password.spaces'), (value) => {
          return value.trim() !== '' && !/\s/.test(value);
        })
        .min(6, t('password.min'))
        .max(20, t('password.max'))
        .matches(passwordCompletly, `${t('password.complexity')} `),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password')], t('passwordConfirm.oneOf'))
        .min(6, t('passwordConfirm.min'))
        .required(t('passwordConfirm.required')),
    })

};
