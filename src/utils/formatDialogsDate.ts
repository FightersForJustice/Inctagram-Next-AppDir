export function formatDialogsDate(
  postDateISO: string,
  lang: string,
  setTimeTranslation: (time: string) => string,
) {

  const postDate = new Date(postDateISO);
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - postDate.getTime();
  const minutes = Math.floor(timeDiff / (1000 * 60));
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  const time = `${postDate.getHours().toString().padStart(2, '0')}:${postDate.getMinutes().toString().padStart(2, '0')}`;

  const langDate = lang === 'en' ? 'en-US' : 'ru-Ru';

  const dayShortName = postDate
    .toLocaleDateString(langDate, { weekday: 'short' });

  const day = postDate.toLocaleDateString(langDate, { day: 'numeric' });
  const month = postDate.toLocaleDateString(langDate, { month: 'short' });
  const date = postDate.toLocaleDateString(langDate, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const postYear = postDate.toLocaleDateString(langDate, {
    year: 'numeric',
  });
  const currentYear = currentDate.toLocaleDateString(langDate, {
    year: 'numeric',
  });

  if (minutes <= 1) {
    return setTimeTranslation('now');
  } else if (minutes > 1 && hours < 24) {
    return time;
  } else if (hours >= 24 && days < 7) {
    return dayShortName[0].toUpperCase() + dayShortName.slice(1);
  } else if (days >= 7 && postYear === currentYear) {
    return `${day} ${month[0].toLowerCase() + month.slice(1)}`;
  } else if (+postYear < +currentYear) {
    return date;
  }
}
