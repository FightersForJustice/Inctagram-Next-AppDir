'use client';

import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { BaseSelector, optionsType } from '@/components/Selector/Selector';
import { ResponseCountries } from '@/app/lib/dataResponseTypes';
import {
  parseCitiesListIntoOptions,
  parseCountriesListIntoOptions,
} from '@/utils/parseIntoSelectOptions';
import { ProfileFormValues } from '../SettingsForm';

import s from './CitySelector.module.scss';

type CitySelectorProps = {
  control: Control<ProfileFormValues>;
  setValue: UseFormSetValue<any>;
  countriesList: ResponseCountries;
  country: string | null;
  city: string | null;
};

export const CitySelectors: React.FC<CitySelectorProps> = ({
  control,
  setValue,
  countriesList,
  country,
  city,
}) => {
  const { t } = useTranslation();
  const translate = (key: string): string =>
    t(`SettingsProfilePage.GeneralInformationTab.${key}`);

  const [checkedCountry, setCheckedCountry] = useState<optionsType>({
    value: country ?? '',
    label: country ?? '',
  });
  const [citiesList, setCitiesList] = useState<string[] | null>(null);

  const defaultValues = {
    country: { value: country || '', label: country || 'Country' },
    city: { value: city || '', label: city || 'City' },
  };

  const onFocusCountryHandler = () => {
    setValue('city', { value: '', label: 'City' });
  };

  const onFocusCityHandler = () => {
    countriesList?.data?.forEach((countryObject) => {
      if (countryObject.country === checkedCountry.value) {
        setCitiesList(countryObject.cities);
      }
    });
  };

  const onCountryChange = (newValue: optionsType) => {
    setCitiesList(null);
    setCheckedCountry(newValue);
  };

  return (
    <div className={s.selectorsContainer}>
      <BaseSelector
        selectorsLabelName={translate('country')}
        name="country"
        id="country"
        defaultValue={defaultValues.country}
        isSearchable
        onFocus={onFocusCountryHandler}
        options={parseCountriesListIntoOptions(countriesList.data)}
        onChange={onCountryChange}
      />

      <Controller
        control={control}
        name="city"
        render={({ field: { onChange, value } }) => (
          <BaseSelector
            selectorsLabelName={translate('city')}
            value={value}
            name="city"
            id="city"
            defaultValue={defaultValues.city}
            isDisabled={!city && !checkedCountry.value.length}
            isSearchable
            onChange={onChange}
            onFocus={onFocusCityHandler}
            options={parseCitiesListIntoOptions(
              citiesList,
              checkedCountry.value
            )}
          />
        )}
      />
    </div>
  );
};
