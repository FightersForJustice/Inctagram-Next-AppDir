import { useTranslations } from 'next-intl';
import * as yup from "yup";


export const  CreateNewPasswordFormSchema =()=> {

const t = useTranslations("Errors");

  return yup
  .object({

    password: yup.string().min(6, t("password.min")).max(20, t("password.max")).required(t("password.required")),
    passwordConfirm: yup.string().oneOf([yup.ref("password")], t("passwordConfirm.oneOf")).min(6, t("passwordConfirm.min")).required(t("passwordConfirm.required")),

  })
  
  .required();
}

