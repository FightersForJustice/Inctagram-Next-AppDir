import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

const passwordCompletly =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\|])[A-Za-z0-9'"`!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\|]{6,20}$/;
const emailValidationRegex = /^[^|$%&/=?^*+!#~'{}]+$/;
const nameValidationRegex = /^[A-Za-z0-9_—-]+$/;
const firsLastCharEmail = /^[^|$%&/=?^*+@!#~'.{}—-]+$/;
const emailDomainRegex = /^[A-Za-z0-9]+$/;
const emailDomainNumberRegex = /^[^\d]*$/;
const emailSubdomainRegex = /^[A-Za-z0-9]+$/;

export const SignUpFormSchema = () => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`Errors.${key}`);
  return yup
    .object({
      userName: yup
        .string()
        .required('userName.required')
        .matches(/^[^\s]+$/, 'userName.spaces')
        .matches(nameValidationRegex, 'userName.invalidCharacters')
        .min(6, 'userName.min')
        .max(30, 'userName.max'),
      email: yup
        .string()
        .required('email.required')
        .matches(emailValidationRegex, 'email.invalidCharacters')
        .test('no-spaces', 'email.spaces', (value) => {
          return !/\s/.test(value);
        })
        .test('valid-domain', 'email.invalidCharacters', (value) => {
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
        .test('firstLastSpec', 'email.invalidCharacters', (value) => {
          const lastChar = value.indexOf('@');
          return (
            firsLastCharEmail.test(value[lastChar - 1]) &&
            firsLastCharEmail.test(value[0])
          );
        }),
      // .email(t("email.email")),
      password: yup
        .string()
        .required('password.required')
        .test('not-spaces', 'password.spaces', (value) => {
          return value.trim() !== '' && !/\s/.test(value);
        })
        .min(6, 'password.min')
        .max(20, 'password.max')
        .matches(passwordCompletly, 'password.complexity'),
      passwordConfirm: yup.string(),
      agreements: yup
        .boolean()
        .oneOf([true], 'agreements.required')
        .required('agreements.required'),
    })
    .required();
};
