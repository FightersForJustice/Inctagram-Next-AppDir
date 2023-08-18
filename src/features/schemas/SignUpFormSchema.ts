import { useTranslations } from 'next-intl';
import * as yup from "yup";

export const SignUpFormSchema = () => {

  const t = useTranslations("Errors")
  const passwordValidationRegex = /^[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\|]+$/;


  return yup
  .object({
    name: yup.string().min(6, t("userName.min")).max(30, t("userName.max")).required(t("userName.required")),
    email: yup.string().email(t("email.email")).required(t("email.required")),
    password: yup
    .string()
    .required(t("password.required"))
    .test("not-only-spaces", t("password.spaces"), (value) => {
      // Проверяем, что пароль не состоит только из пробелов
      return value.trim() !== "";
    })
    .test("no-inner-spaces", t("password.spaces"), (value) => {
      // Проверяем, что пароль не содержит пробелов внутри
      return !/\s/.test(value);
    })
    .matches(passwordValidationRegex, t("password.invalidCharacters"))
    .min(6, t("password.min"))
    .max(20, t("password.max")),
    passwordConfirm: yup.string().oneOf([yup.ref("password")], t("passwordConfirm.oneOf")).min(6, t("passwordConfirm.min")).required(t("passwordConfirm.required")),
    agreements: yup.boolean().oneOf([true], t("agreements.required")).required(t("agreements.required")),
  })
  .required();
}


// .string()
// .required(t("password.required"))
// .test("not-only-spaces", t("password.spaces"), (value) => {
//   // Проверяем, что пароль не состоит только из пробелов
//   return value.trim() !== "";
// })
// .test("no-inner-spaces", t("password.spaces"), (value) => {
//   // Проверяем, что пароль не содержит пробелов внутри
//   return !/\s/.test(value);
// })
// .matches(passwordValidationRegex, t("password.invalidCharacters"))
// .min(6, t("password.min"))
// .max(20, t("password.max"))
// })
