import { DateObject } from 'react-multi-date-picker';

export const convertToReactDatePickerObject = (
  dateString: string | null
): DateObject | string => {

  if (dateString) {
    const date = new Date(dateString);
    const dateObject = new DateObject({
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate(),
      hour: date.getUTCHours(),
      minute: date.getUTCMinutes(),
      second: date.getUTCSeconds(),
    });

    return dateObject
  }
  else return ''
}

export const convertToISOString = (dateObject: DateObject) => {
  const formattedDate = new Date(dateObject.year, +dateObject.month, dateObject.day, dateObject.hour, dateObject.minute, dateObject.second, dateObject.millisecond);

  return formattedDate.toISOString();
}
