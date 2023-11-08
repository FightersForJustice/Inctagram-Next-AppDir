import * as yup from 'yup';
import { useTranslations } from 'next-intl';

export const ForgotPasswordSchema = () => {
  const t = useTranslations('Errors');

  return yup
    .object({
      email: yup.string().email(t('email.email')).required(t('email.required')),
    })
    .required();
};
