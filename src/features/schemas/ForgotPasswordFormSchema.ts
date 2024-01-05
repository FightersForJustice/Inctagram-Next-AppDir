import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export const ForgotPasswordSchema = () => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`Errors.${key}`);
  return yup
    .object({
      email: yup
        .string()
        .email(translate('email.email'))
        .required(translate('email.required')),
    })
    .required();
};
