import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

export const CreateNewPasswordFormSchema = () => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`Errors.${key}`);
  const passwordCompletly =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\|])[A-Za-z0-9'"`!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\|]{6,20}$/;

  return yup.object({
    password: yup
      .string()
      .required(translate('password.required'))
      .test('not-spaces', translate('password.spaces'), (value) => {
        return value.trim() !== '' && !/\s/.test(value);
      })
      .min(6, translate('password.min'))
      .max(20, translate('password.max'))
      .matches(passwordCompletly, `${translate('password.complexity')} `),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password')], translate('passwordConfirm.oneOf'))
      .min(6, translate('passwordConfirm.min'))
      .required(translate('passwordConfirm.required')),
  });
};
