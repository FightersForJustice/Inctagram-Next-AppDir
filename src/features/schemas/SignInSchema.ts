import { useTranslations } from 'next-intl';
import * as yup from "yup";


export const SignInSchema = ()=> {

const t = useTranslations("Errors")

  return yup
  .object({
    email: yup.string().email(t("email.email")).required(t("email.required")),
    password: yup.string().min(6, t("password.min")).max(20, t("password.max")).required(t("password.required")),
  })
  .required();
}

