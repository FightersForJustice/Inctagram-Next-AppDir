export const formatSubscriptionDate = (inputDate: string): string => {
  const date = new Date(inputDate);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear() % 100; // Получаем последние две цифры года

  // Добавляем ведущий ноль к дню и месяцу, если они состоят из одной цифры
  const formattedDay = day < 10 ? `0${day}` : `${day}`;
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;

  return `${formattedDay}.${formattedMonth}.${year}`;
};
