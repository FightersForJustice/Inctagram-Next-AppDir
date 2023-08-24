import { useTranslations } from "next-intl";
import * as yup from "yup";

export const SignUpFormSchema = () => {
  const t = useTranslations("Errors");
  const passwordCompletly =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\|])[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\|]{6,20}$/;
  const emailValidationRegex = /^[^|$%&/=?^*+!#~'{}]+$/;
  const nameValidationRegex = /^[A-Za-z0-9_—-]+$/;
  const firsLastCharEmail = /^[^|$%&/=?^*+@!#~'.{}—-]+$/;

  return yup
    .object({
      name: yup
        .string()
        .required(t("userName.required"))
        .matches(/^[^\s]+$/, t("userName.spaces"))
        .matches(nameValidationRegex, t("userName.invalidCharacters"))
        .min(6, t("userName.min"))
        .max(30, t("userName.max")),
      email: yup
        .string()
        .required(t("email.required"))
        .matches(emailValidationRegex, t("email.invalidCharacters"))
        .test("valid-domain", t("email.invalidCharacters"), (value) => {
          const parts = value.split("@");
          if (parts.length === 2) {
            const [local, domain] = parts;
            return domain.includes(".") && !domain.includes("_") && !local.includes("..");
          }
          return false;
        })
        .test("firstSpec", t("email.invalidCharacters"), (value) => {
          const lastChar = value.indexOf("@");
          return firsLastCharEmail.test(value[lastChar - 1]) && firsLastCharEmail.test(value[0]);
        })
        .test("not-spaces", t("email.spaces"), (value) => {
          return value.trim() !== "" && !/\s/.test(value);
        }),
      // .email(t("email.email")),
      password: yup
        .string()
        .required(t("password.required"))
        .test("not-spaces", t("password.spaces"), (value) => {
          // Проверяем, что пароль не состоит только из пробелов
          return value.trim() !== "" && !/\s/.test(value);
        })
        .min(6, t("password.min"))
        .max(20, t("password.max"))
        .matches(passwordCompletly, `${t("password.complexity")} `),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password")], t("passwordConfirm.oneOf"))
        .min(6, t("passwordConfirm.min"))
        .required(t("passwordConfirm.required")),
      agreements: yup.boolean().oneOf([true], t("agreements.required")).required(t("agreements.required")),
    })
    .required();
};
