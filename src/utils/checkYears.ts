import { DateObject } from 'react-multi-date-picker';
import { convertToReactDatePickerObject } from './convertTimeDatePicker';

const today = new Date();
const birthDate = (date: DateObject) => new Date(date.toDate());
const years13 = new Date(
  today.getUTCFullYear() - 13,
  today.getUTCMonth(),
  today.getUTCDate()
);
const convertToDays = 1000 * 60 * 60 * 24;

export function isLessThen13YearsOld(date: DateObject | DateObject[] | string) {
  if (!(date instanceof DateObject)) {
    return false;
  }

  const birthDays = Math.ceil(
    (today.getTime() - birthDate(date).getTime()) / convertToDays
  );
  const neededDays =
    Math.floor((today.getTime() - +years13) / convertToDays) + 1;

  return neededDays > birthDays;
}

export function isMoreThen100YearsOld(
  date: DateObject | DateObject[] | string
) {
  if (!(date instanceof DateObject)) {
    return false;
  }
  const ageYears = today.getFullYear() - birthDate(date).getFullYear();
  if (Number.isNaN(ageYears)) {
    return true;
  }

  return ageYears > 100;
}

export function isAgeValid(inputDateString: string | undefined) {
  if (inputDateString) {
    const dateObj = convertToReactDatePickerObject(inputDateString);

    return isMoreThen100YearsOld(dateObj) === isLessThen13YearsOld(dateObj);
  }
}
