'use client';

import {
  Control,
  Controller,
  UseFormReset,
  UseFormResetField,
  UseFormSetValue,
} from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { BaseSelector, optionsType } from '@/components/Selector/Selector';
import { fetchCountriesList } from '@/app/lib/actions';
import {
  ResponseCountries,
  ResponseCountriesItem,
} from '@/app/lib/dataResponseTypes';
import {
  parseCitiesListIntoOptions,
  parseCountriesListIntoOptions,
} from '@/utils/parseIntoSelectOptions';
import { ProfileFormValues } from '../SettingsForm';

import s from './CitySelector.module.scss';

type CitySelectorProps = {
  userCity: string | null;
  control: Control<ProfileFormValues>;
  setValue: UseFormSetValue<any>;
  countriesList: ResponseCountries;
};

export const CitySelectors: React.FC<CitySelectorProps> = ({
  userCity,
  control,
  setValue,
  countriesList,
}) => {
  const translate = useTranslations(
    'SettingsProfilePage.GeneralInformationTab'
  );

  const cityArr = userCity?.split(',') || '';

  const country = cityArr[0] || '';
  const city = cityArr[1] || '';

  const [checkedCountry, setCheckedCountry] = useState<optionsType>({
    value: country ?? '',
    label: country ?? '',
  });
  const [citiesList, setCitiesList] = useState<string[] | null>(null);

  const defaultValues = {
    country: { value: country, label: country },
    city: { value: city, label: city },
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
            isDisabled={!userCity && !checkedCountry.value.length}
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
