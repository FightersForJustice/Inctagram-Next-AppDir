import { ResponseCountriesItem } from "@/app/lib/dataResponseTypes";

export const parseCountriesListIntoOptions = (
    countriesList: ResponseCountriesItem[] | null
) => {
    if (!!countriesList?.length) {
        return countriesList.map((country) => ({
            value: country.country,
            label: country.country,
        }));
    } else return null;
};

export const parseCitiesListIntoOptions = (
    citiesList: string[] | null,
    checkedCountry: string
) => {
    if (!!citiesList?.length) {
        return citiesList.map((city) => ({
            value: `${checkedCountry},${city}`,
            label: city,
        }));
    } else return null;
};

