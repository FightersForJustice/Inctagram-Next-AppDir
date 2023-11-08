import { createPluralize } from '@/helpers/createPluralize';
export function formatTimeFromDateString(dateString: string): string {
  const normalDate = new Date(dateString);
  const hours = normalDate.getUTCHours().toString().padStart(2, '0');
  const minutes = normalDate.getUTCMinutes().toString().padStart(2, '0');
  const seconds = normalDate.getUTCSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

export function getTimeAgoText(
  postDateISO: string,
  lang: string,
  setTimeTranslation: (time: string) => string
): string {
  const pluralizeLang = createPluralize(lang);

  const postDate = new Date(postDateISO);
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - postDate.getTime();
  const minutes = Math.floor(timeDiff / (1000 * 60));
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));

  if (minutes < 1) {
    return setTimeTranslation('now');
  } else if (minutes < 60) {
    //`${minutes} минут(ы) назад`;
    return `${minutes} ${setTimeTranslation(
      `minutes.${pluralizeLang(minutes)}`
    )}`;
  } else if (hours < 24) {
    //`${hours} часа(ов) назад`;
    return `${hours} ${setTimeTranslation(`hours.${pluralizeLang(hours)}`)}`;
  } else if (days < 30) {
    //`${days} дня(ей) назад`;
    return `${days} ${setTimeTranslation(`days.${pluralizeLang(days)}`)}`;
  } else if (months < 12) {
    //`${months} месяцев назад`;
    return `${months} ${setTimeTranslation(`months.${pluralizeLang(months)}`)}`;
  } else {
    //`${years} год(а) назад`;
    return `${years} ${setTimeTranslation(`years.${pluralizeLang(years)}`)}`;
  }
}
