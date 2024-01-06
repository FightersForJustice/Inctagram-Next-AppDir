import * as yup from 'yup';
import { useTranslations } from 'next-intl';

const passwordCompletly =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\|])[A-Za-z0-9'"`!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\|]{6,20}$/;
const emailValidationRegex = /^[^|$%&/=?^*+!#~'{}]+$/;
const nameValidationRegex = /^[A-Za-z0-9_—-]+$/;
const firsLastCharEmail = /^[^|$%&/=?^*+@!#~'.{}—-]+$/;
const emailDomainRegex = /^[A-Za-z0-9]+$/;
const emailDomainNumberRegex = /^[^\d]*$/;
const emailSubdomainRegex = /^[A-Za-z0-9]+$/;

export const SignUpFormSchema = () => {
  const t = useTranslations('Errors');

  return yup
    .object({
      userName: yup
        .string()
        .required(t('userName.required'))
        .matches(/^[^\s]+$/, t('userName.spaces'))
        .matches(nameValidationRegex, t('userName.invalidCharacters'))
        .min(6, t('userName.min'))
        .max(30, t('userName.max')),
      email: yup
        .string()
        .required(t('email.required'))
        .matches(emailValidationRegex, t('email.invalidCharacters'))
        .test('no-spaces', t('email.spaces'), (value) => {
          return !/\s/.test(value);
        })
        .test('valid-domain', t('email.invalidCharacters'), (value) => {
          const parts = value.split('@');
          if (parts.length === 2) {
            const [local, fullDomain] = parts;
            const domainParts = fullDomain.split('.');
            if (domainParts.length >= 2) {
              const subdomain = domainParts[0];
              const mainDomain = domainParts[1];
              return (
                emailDomainRegex.test(subdomain) &&
                emailDomainRegex.test(mainDomain) &&
                emailDomainNumberRegex.test(mainDomain) &&
                fullDomain.includes('.') &&
                !local.includes('..') &&
                !fullDomain.includes('..') &&
                subdomain.trim() !== '' &&
                emailSubdomainRegex.test(subdomain) &&
                !value.includes(',') // Добавляем проверку на запятые
              );
            }
          }
          return false;
        })
        .test('firstLastSpec', t('email.invalidCharacters'), (value) => {
          const lastChar = value.indexOf('@');
          return (
            firsLastCharEmail.test(value[lastChar - 1]) &&
            firsLastCharEmail.test(value[0])
          );
        }),
      // .email(t("email.email")),
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
      agreements: yup
        .boolean()
        .oneOf([true], t('agreements.required'))
        .required(t('agreements.required')),
    })
    .required();
};
