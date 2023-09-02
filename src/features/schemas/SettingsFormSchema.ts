import * as yup from "yup";
import { useTranslations } from "next-intl";

export const SettingsFormSchema = () => {
  const t = useTranslations("SettingsProfilePage.SettingsFormSchema");

  return yup.object({
    userName: yup
      .string()
      .matches(/^[A-Za-z0-9_—-]+$/, t("userName.matches"))
      .min(6, t("userName.min"))
      .max(30, t("userName.max"))
      .required(t("userName.required")),
    firstName: yup
      .string()
      .matches(/^[A-Za-zА-Яа-я]+$/, t("firstName.matches"))
      .min(1, t("firstName.min"))
      .max(50, t("firstName.max"))
      .required(t("firstName.required")),
    lastName: yup
      .string()
      .matches(/^[A-Za-zА-Яа-я]+$/, t("lastName.matches"))
      .min(1, t("lastName.min"))
      .max(50, t("lastName.max"))
      .required(t("lastName.required")),
    city: yup.string().max(30, t("city.max")).nullable(),
    aboutMe: yup
      .string()
      .matches(/^(?!.*\s\s)[0-9A-Za-zА-Яа-я\s]*[0-9A-Za-zА-Яа-я]$/, t("aboutMe.matches"))
      .min(1, t("aboutMe.min"))
      .max(200, t("aboutMe.max"))
      .nullable(),
  });
};
