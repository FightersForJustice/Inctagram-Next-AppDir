import * as yup from "yup";

export const CreateNewPasswordFormSchema = yup
  .object({
    password: yup.string().min(6).max(20).required(),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Password mismatch")
      .min(6)
      .required(),
  })
  .required();
