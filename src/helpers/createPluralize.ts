export const createPluralize = (locale: string) => {
  console.log(locale);
  const rules = new Intl.PluralRules(locale);
  return (count: number) => {
    return rules.select(count);
  };
};
