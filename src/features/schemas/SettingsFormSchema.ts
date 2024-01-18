import * as yup from 'yup';
import { useTranslations } from 'next-intl';
import { isAgeValid } from '@/utils/checkYears';

export const SettingsFormSchema = () => {
  const t = useTranslations('SettingsProfilePage.SettingsFormSchema');

  return yup.object({
    userName: yup
      .string()
      .min(6, t('userName.min'))
      .matches(/^[A-Za-z0-9_-]+$/, t('userName.matches'))
      .max(30, t('userName.max'))
      .required(t('userName.required')),
    firstName: yup
      .string()
      .min(1, t('firstName.min'))
      .matches(/^[A-Za-zА-ЯЁа-яё]+$/, t('firstName.matches'))
      .max(50, t('firstName.max'))
      .required(t('firstName.required')),
    lastName: yup
      .string()
      .min(1, t('lastName.min'))
      .matches(/^[A-Za-zА-ЯЁа-яё]+$/, t('lastName.matches'))
      .max(50, t('lastName.max'))
      .required(t('lastName.required')),
    aboutMe: yup
      .string()
      .min(0, t('aboutMe.min'))
      .max(200, t('aboutMe.max'))
      .nullable(),
    dateOfBirth: yup
      .string()
      .test("ageLimit", "_", (date) => isAgeValid(date))
      .required()
  });
};
