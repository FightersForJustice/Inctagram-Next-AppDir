export function formatTimeFromDateString(dateString: string): string {
  const normalDate = new Date(dateString);
  const hours = normalDate.getUTCHours().toString().padStart(2, "0");
  const minutes = normalDate.getUTCMinutes().toString().padStart(2, "0");
  const seconds = normalDate.getUTCSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}
