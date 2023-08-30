import { DateObject } from "react-multi-date-picker";

export const convertToReactDatePickerObject = (dateString: string): DateObject => {
  const date = new Date(dateString);

  const dateObject = new DateObject({
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
    hour: date.getUTCHours(),
    minute: date.getUTCMinutes(),
    second: date.getUTCSeconds(),
  });

  return dateObject;
};
