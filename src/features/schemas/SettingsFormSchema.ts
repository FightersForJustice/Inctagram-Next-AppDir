import * as yup from "yup";

export const SettingsFormSchema = yup
  .object({
    userName: yup.string().min(6).max(30).required(),
    firstName: yup.string().min(5).max(15).nullable(),
    lastName: yup.string().min(5).max(15).nullable(),
    city: yup.string().min(3).max(15).nullable(),
    aboutMe: yup.string().min(10).max(200).required(),
  })
  .required();
