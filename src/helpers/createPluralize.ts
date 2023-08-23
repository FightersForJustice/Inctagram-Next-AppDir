


export const createPluralize = (locale: string) => {
  const rules = new Intl.PluralRules(locale);

  const pluralize = (count: number) => {
    return rules.select(count);
  };

  return pluralize;
};
export const pluralizeRu = createPluralize("ru");
export const pluralizeEn = createPluralize("en");

// console.log(pluralizeRu(0)); //many
// console.log(pluralizeRu(1)); //one
// console.log(pluralizeRu(2)); //few
// console.log(pluralizeRu(21)); //one



