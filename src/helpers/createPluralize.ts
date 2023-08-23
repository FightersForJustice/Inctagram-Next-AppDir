


export const createPluralize = (locale: string) => {
  const rules = new Intl.PluralRules(locale);

  const pluralize = (count: number) => {
    return rules.select(count);
  };

  return pluralize;
};




