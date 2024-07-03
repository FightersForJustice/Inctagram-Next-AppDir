import Cookies from 'js-cookie';

export const useGetLanguage = () => {
  return Cookies.get('userLanguage') || 'en';
};
