import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

export const SignUpFormSchema = () => {

  const { t } = useTranslation();
  const translate = (key: string): string => t(`Errors.${key}`);

  const passwordCompletly =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\|])[A-Za-z0-9'"`!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\|]{6,20}$/;
  const emailValidationRegex = /^[^|$%&/=?^*+!#~'{}]+$/;
  const nameValidationRegex = /^[A-Za-z0-9_—-]+$/;
  const firsLastCharEmail = /^[^|$%&/=?^*+@!#~'.{}—-]+$/;
  const emailDomainRegex = /^[A-Za-z0-9]+$/;
  const emailDomainNumberRegex = /^[^\d]*$/;
  const emailSubdomainRegex = /^[A-Za-z0-9]+$/;

  return yup
    .object({
      userName: yup
        .string()
        .required(translate('userName.required'))
        .matches(/^[^\s]+$/, translate('userName.spaces'))
        .matches(nameValidationRegex, translate('userName.invalidCharacters'))
        .min(6, translate('userName.min'))
        .max(30, translate('userName.max')),
      email: yup
        .string()
        .required(translate('email.required'))
        .matches(emailValidationRegex, translate('email.invalidCharacters'))
        .test('no-spaces', translate('email.spaces'), (value) => {
          return !/\s/.test(value);
        })
        .test('valid-domain', translate('email.invalidCharacters'), (value) => {
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
        .test('firstLastSpec', translate('email.invalidCharacters'), (value) => {
          const lastChar = value.indexOf('@');
          return (
            firsLastCharEmail.test(value[lastChar - 1]) &&
            firsLastCharEmail.test(value[0])
          );
        }),
      // .email(t("email.email")),
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
      agreements: yup
        .boolean()
        .oneOf([true], translate('agreements.required'))
        .required(translate('agreements.required')),
    })
    .required();
};
