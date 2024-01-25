import { DateObject } from 'react-multi-date-picker';
import { isISODateFormat } from './dateToFormat';

export const convertToReactDatePickerObject = (
  dateString: string | null
): DateObject | string => {
  if (!dateString) {
    return '';
  }

  if (isISODateFormat(dateString)) {
    const date = new Date(dateString);
    return new DateObject({
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate(),
      hour: date.getUTCHours(),
      minute: date.getUTCMinutes(),
      second: date.getUTCSeconds(),
    });
  }

  const [day, month, year] = dateString.split('/');
  const date = new Date(+year, +month, +day);

  return new DateObject({
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  });
};

export const convertToISOString = (dateInput: DateObject | string) => {
  let formattedDate = new Date();

  if (dateInput instanceof DateObject) {
    formattedDate = new Date(
      Date.UTC(
        dateInput.year,
        +dateInput.month - 1,
        dateInput.day,
        dateInput.hour,
        dateInput.minute,
        dateInput.second,
        dateInput.millisecond
      )
    );
  } else {
    const [day, month, year] = dateInput.split('/');
    formattedDate = new Date(Date.UTC(+year, +month, +day));
  }

  return formattedDate.toISOString();
};
