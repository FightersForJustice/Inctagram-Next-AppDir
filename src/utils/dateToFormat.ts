export const dateToFormat = (dateString: string) => {
  let dateObject = new Date(dateString);

  let day = dateObject.getUTCDate();
  let month = dateObject.getUTCMonth() + 1;
  let year = dateObject.getUTCFullYear();

  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  return `${formattedDay}/${formattedMonth}/${year}`;
};

const isoDateFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
export const isISODateFormat = (str: string) => isoDateFormatRegex.test(str);

export const validateDatePicker = (input: any) => {
  const strings = input.value.split('/');
  const numbers = strings.map(Number);
  const [day, month, year] = numbers;

  if (!input.value || strings.some((number: number) => isNaN(number))) {
    return false;
  }

  const currentYear = new Date().getFullYear();
  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 0 || year > currentYear) {
    return false;
  }

  return true;
}