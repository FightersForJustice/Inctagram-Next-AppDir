import Cookies from "js-cookie";

// Функция для чтения значения куки по имени
export function getCookie(name: string): string | undefined {
  return Cookies.get(name);
}

// Функция для установки значения куки
export function setCookie(name: string, value: string, options: Cookies.CookieAttributes = {}): void {
  Cookies.set(name, value, options);
}

// Функция для удаления куки по имени
export function removeCookie(name: string): void {
  Cookies.remove(name);
}
