import * as yup from "yup";

export const SignUpFormSchema = yup
  .object({
    userName: yup.string().min(3).max(30).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(20).required(),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Password mismatch")
      .min(6)
      .required(),
  })
  .required();
