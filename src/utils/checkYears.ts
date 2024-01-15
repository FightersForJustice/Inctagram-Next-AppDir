import { DateObject } from 'react-multi-date-picker';

export function isMoreThen13YearsOld(date: DateObject | DateObject[] | string) {
  if (date) {
    // @ts-ignore
    const birthDate = new Date(date.toDate().toString());
    const today = new Date();
    const ageYears = today.getFullYear() - birthDate.getFullYear();

    return !(ageYears < 13);
  }

  return true;
}

export function isLessThen100YearsOld(
  date: DateObject | DateObject[] | string
) {
  if (date) {
    // @ts-ignore
    const birthDate = new Date(date.toDate().toString());
    const today = new Date();
    const ageYears = today.getFullYear() - birthDate.getFullYear();

    return !(ageYears > 100);
  }

  return true;
}
