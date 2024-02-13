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
