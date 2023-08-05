import { useTranslations } from 'next-intl';
import * as yup from "yup";

export const SignUpFormSchema = () => {

  const t = useTranslations("Errors")


  return yup
  .object({
    userName: yup.string().min(6, t("userName.min")).max(30, t("userName.max")).required(t("userName.required")),
    email: yup.string().email(t("email.email")).required(t("email.required")),
    password: yup.string().min(6, t("password.min")).max(20, t("password.max")).required(t("password.required")),
    passwordConfirm: yup.string().oneOf([yup.ref("password")], t("passwordConfirm.oneOf")).min(6, t("passwordConfirm.min")).required(t("passwordConfirm.required")),
    agreements: yup.boolean().oneOf([true], t("agreements.required")).required(t("agreements.required")),
  })
  .required();
}


// export const SignUpFormSchema = yup
//   .object({
//     userName: yup.string().min(6).max(30).required(),
//     email: yup.string().email().required(),
//     password: yup.string().min(6).max(20).required(),
//     passwordConfirm: yup
//       .string()
//       .oneOf([yup.ref("password")], "Password mismatch")
//       .min(6)
//       .required(),
//     agreements: yup.boolean().oneOf([true], "agreements must be accepted").required(),
//   })
//   .required();
