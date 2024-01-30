const months: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const formatServerDate = (dateStr?: string) => {
  if (dateStr) {
    const date = new Date(dateStr);
    const day: number = date.getDate();
    const month: string = months[date.getMonth()];
    const year: number = date.getFullYear();
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    return `${month} ${day}, ${year} at ${hours}:${
      minutes < 10 ? '0' : ''
    }${minutes}`;
  }
  return;
};

export const formatServerDateWithoutTime = (dateStr?: string) => {
  if (dateStr) {
    const date = new Date(dateStr);
    const day: number = date.getDate();
    const month: string = months[date.getMonth()];
    const year: number = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }
  return;
};
