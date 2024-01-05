import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export const SettingsFormSchema = () => {
  const { t } = useTranslation();
  const translate = (key: string): string =>
    t(`SettingsProfilePage.SettingsFormSchema.${key}`);
  return yup.object({
    userName: yup
      .string()
      .min(6, translate('userName.min'))
      .matches(/^[A-Za-z0-9_-]+$/, translate('userName.matches'))
      .max(30, translate('userName.max'))
      .required(translate('userName.required')),
    firstName: yup
      .string()
      .min(1, translate('firstName.min'))
      .matches(/^[A-Za-zА-ЯЁа-яё]+$/, translate('firstName.matches'))
      .max(50, translate('firstName.max'))
      .required(translate('firstName.required')),
    lastName: yup
      .string()
      .min(1, translate('lastName.min'))
      .matches(/^[A-Za-zА-ЯЁа-яё]+$/, translate('lastName.matches'))
      .max(50, translate('lastName.max'))
      .required(translate('lastName.required')),
    city: yup.string().max(30, translate('city.max')).nullable(),
    aboutMe: yup
      .string()
      .min(0, translate('aboutMe.min'))
      .max(200, translate('aboutMe.max'))
      .nullable(),
  });
};
