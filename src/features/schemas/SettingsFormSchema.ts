import * as yup from "yup";

export const SettingsFormSchema = () => {
  return yup
    .object({
      userName: yup.string().min(6).max(30).required(),
      firstName: yup.string().max(15).required(),
      lastName: yup.string().max(15).required(),
      city: yup.string().max(15).nullable(),
      aboutMe: yup.string().min(0).max(200).nullable(),
    })
    .required();
};
