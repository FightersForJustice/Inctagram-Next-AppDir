import { useTranslations } from "next-intl";
import * as yup from "yup";

export const SignInSchema = () => {
  const t = useTranslations("Errors");

  const emailValidationRegex = /^[^|$%&/=?^*+!#~'{}]+$/;
  const passwordValidationRegex = /^[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\|]+$/;

  return yup
    .object({
      email: yup
      .string()
      .matches(emailValidationRegex, t("email.invalidCharacters"))
      .email(t("email.email"))
      .required(t("email.required"))
      ,
      password: yup
        .string()
        .matches(passwordValidationRegex, t("password.invalidCharacters"))
        .min(6, t("password.min"))
        .max(20, t("password.max"))
        .required(t("password.required"))
        .test("not-only-spaces", t("password.onlySpaces"), (value) => {
          // Проверяем, что пароль не состоит только из пробелов
          return value.trim() !== "";
        })
        .test("no-inner-spaces", t("password.innerSpaces"), (value) => {
          // Проверяем, что пароль не содержит пробелов внутри
          return !/\s/.test(value);
        }),
    })
    .required();
};
