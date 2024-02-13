import * as yup from 'yup';
import { isAgeValid } from '@/utils/checkYears';

export const SettingsFormSchema = () => {
  return yup.object({
    userName: yup
      .string()
      .min(6, 'userName.min')
      .matches(/^[A-Za-z0-9_-]+$/, 'userName.matches')
      .max(30, 'userName.max')
      .required('userName.required'),
    firstName: yup
      .string()
      .min(1, 'firstName.min')
      .matches(/^[A-Za-zА-ЯЁа-яё]+$/, 'firstName.matches')
      .max(50, 'firstName.max')
      .required('firstName.required'),
    lastName: yup
      .string()
      .min(1, 'lastName.min')
      .matches(/^[A-Za-zА-ЯЁа-яё]+$/, 'lastName.matches')
      .max(50, 'lastName.max')
      .required('lastName.required'),
    aboutMe: yup
      .string()
      .min(0, 'aboutMe.min')
      .max(200, 'aboutMe.max')
      .nullable(),
    dateOfBirth: yup
      .string()
      .test('ageLimit', '_', (date) => isAgeValid(date))
      .required(),
  });
};
