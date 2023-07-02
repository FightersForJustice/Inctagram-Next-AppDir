interface DictionaryEntry {
  homeHeader: string;
  homeContent: string;
  aboutHeader: string;
  aboutContent: string;
}

export const signUp = {
  en: {
    username: "Username",
    email: "Email",
    password: "Password",
    passwordConfirm: "Password confirmation",
  },
  ru: {
    username: "Имя",
    email: "Почта",
    password: "Пароль",
    passwordConfirm: "Подтвердить пароль",
  },
};

export const dictionary: Record<string, DictionaryEntry> = {
  en: {
    homeHeader: "Home",
    homeContent: "Welcome to my home.",
    aboutHeader: "About Me",
    aboutContent: "Here is some information about me. English is my primary language.",
  },
  es: {
    homeHeader: "Casa",
    homeContent: "Beinvenidos a mi casa.",
    aboutHeader: "Sobre Yo",
    aboutContent: "Aqui tenemos un poco informacion sobre yo. Hablo espanol tambien.",
  },
};
