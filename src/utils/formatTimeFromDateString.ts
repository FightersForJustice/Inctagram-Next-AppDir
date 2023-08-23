export function formatTimeFromDateString(dateString: string): string {
  const normalDate = new Date(dateString);
  const hours = normalDate.getUTCHours().toString().padStart(2, "0");
  const minutes = normalDate.getUTCMinutes().toString().padStart(2, "0");
  const seconds = normalDate.getUTCSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

export function GetTimeAgoText(postDateISO: string): string {
  const postDate = new Date(postDateISO);
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - postDate.getTime();
  const minutes = Math.floor(timeDiff / (1000 * 60));
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));


  if (minutes < 1) {
    return `только что`;
  } else if (minutes < 60) {
    return `${minutes} минут(ы) назад`;
  } else if (hours < 24) {
    return `${hours} часа(ов) назад`;
  } else if (days === 1) {
    return "Один день назад";
  } else if (days < 30) {
    return `${days} дня(ей) назад`;
  } else if (months < 12) {
    return `${months} месяцев назад`;
  } else {
    return `${years} год(а) назад`;
  }
}
