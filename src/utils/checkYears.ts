import { DateObject } from 'react-multi-date-picker';
import { convertToReactDatePickerObject } from './convertTimeDatePicker';

const getDateYearsAgo = (year: number) =>
  new Date(
    today.getUTCFullYear() - year,
    today.getUTCMonth(),
    today.getUTCDate() + 1
  );

const today = new Date();
const birthDate = (date: DateObject) => new Date(date.toDate());
const birthDays = (date: DateObject) => {
  return Math.ceil(
    (+getDateYearsAgo(0) - birthDate(date).getTime()) / convertToDays
  );
};



const convertToDays = 1000 * 60 * 60 * 24;

export function isLessThen13YearsOld(date: DateObject | DateObject[] | string) {
  if (!(date instanceof DateObject)) {
    return false;
  }

  const neededDays =
    Math.floor((+getDateYearsAgo(0) - +getDateYearsAgo(13)) / convertToDays) +
    1;

  return neededDays > birthDays(date);
}

export function isMoreThen100YearsOld(
  date: DateObject | DateObject[] | string
) {
  if (!(date instanceof DateObject)) {
    return false;
  }

  const limitDays =
    Math.ceil((+getDateYearsAgo(0) - +getDateYearsAgo(100)) / convertToDays) +
    1;

  return birthDays(date) > limitDays;
}

export function isAgeValid(inputDateString: string | undefined) {
  if (inputDateString) {
    const dateObj = convertToReactDatePickerObject(inputDateString);

    return isMoreThen100YearsOld(dateObj) === isLessThen13YearsOld(dateObj);
  }
}
