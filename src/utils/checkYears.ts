import { DateObject } from 'react-multi-date-picker';

const today = new Date();
const birthDate = (date: DateObject) => new Date(date.toDate().toString());

export function isMoreThen13YearsOld(date: DateObject | DateObject[] | string) {
  if (date) {
    // @ts-ignore
    const ageYears = today.getFullYear() - birthDate(date).getFullYear();

    return !(ageYears < 13);
  }

  return true;
}

export function isLessThen100YearsOld(
  date: DateObject | DateObject[] | string
) {
  if (date) {
    // @ts-ignore
    const ageYears = today.getFullYear() - birthDate(date).getFullYear();

    return !(ageYears > 100);
  }

  return true;
}
