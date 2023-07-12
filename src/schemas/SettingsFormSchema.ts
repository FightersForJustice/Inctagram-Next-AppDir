import * as yup from "yup";

export const SettingsFormSchema = yup
  .object({
    userName: yup.string().min(6).max(30).required(),
    firstName: yup.string().min(5).max(15).required(),
    lastName: yup.string().min(5).max(15).required(),
    city: yup.string().min(3).max(15).required(),
    aboutMe: yup.string().min(10).max(200),
  })
  .required();
