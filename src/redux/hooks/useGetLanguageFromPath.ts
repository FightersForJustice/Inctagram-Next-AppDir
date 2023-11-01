export const useGetLanguageFromPath = (): "ru" | "en" => {
  return /\/ru/.test(location.pathname) ? "ru" : "en";
};
