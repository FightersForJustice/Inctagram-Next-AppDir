import { DateObject } from 'react-multi-date-picker';
import { convertToReactDatePickerObject } from './convertTimeDatePicker';

const today = new Date();
const birthDate = (date: DateObject) => new Date(date.toDate().toString());

export function isLessThen13YearsOld(date: DateObject | DateObject[] | string) {
  if (date) {
    // @ts-ignore
    const ageYears = today.getFullYear() - birthDate(date).getFullYear();

    return ageYears < 13
  }

  return false;
}

export function isMoreThen100YearsOld(
  date: DateObject | DateObject[] | string  
) {
  if (date) {
    // @ts-ignore
    const ageYears = today.getFullYear() - birthDate(date).getFullYear();
    return ageYears > 100
  }

  return false;
}

export function isAgeValid(inputDateString: string | undefined) {
  if (inputDateString) {
    const dateObj = convertToReactDatePickerObject(inputDateString)
    
    return isMoreThen100YearsOld(dateObj) === isLessThen13YearsOld(dateObj)
  }
}
