'use client';

import {
  Control,
  Controller,
  UseFormReset,
  UseFormResetField,
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
import { FormValues } from '../SettingsForm';

import s from './CitySelector.module.scss';

type CitySelectorProps = {
  userCity: string | null;
  control: Control<FormValues>;
  resetField: UseFormResetField<FormValues>;
  reset: UseFormReset<FormValues>;
};

export const CitySelectors: React.FC<CitySelectorProps> = ({
  resetField,
  userCity,
  control,
  reset,
}) => {
  const translate = useTranslations(
    'SettingsProfilePage.GeneralInformationTab'
  );

  const [countriesList, setCountriesList] = useState<
    ResponseCountriesItem[] | null
  >(null);

  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [checkedCountry, setCheckedCountry] = useState<optionsType>({
    value: '',
    label: '',
  });
  const [citiesList, setCitiesList] = useState<string[] | null>(null);

  const defaultValues = {
    country: { value: '', label: 'Country' },
    city: { value: '', label: 'City' },
  };

  const onFocusCountryHandler = () => {
    if (!isLoadingCountries) {
      setIsLoadingCountries(true);
      fetchCountriesList()
        .then((res: ResponseCountries) => {
          setCountriesList(res.data);
        })
        .then(() => setIsLoadingCountries(false));
      reset(defaultValues);
      resetField('city');
    }
  };

  const onFocusCityHandler = () => {
    countriesList?.forEach((countryObject) => {
      if (countryObject.country === checkedCountry.value) {
        setCitiesList(countryObject.cities);
      }
    });
  };

  const onCountryChange = (newValue: optionsType) => {
    setCitiesList(null);
    setCheckedCountry(newValue);
    resetField('city');
  };

  return (
    <div className={s.selectorsContainer}>
      <BaseSelector
        selectorsLabelName={translate('country')}
        name="country"
        id="country"
        isLoading={isLoadingCountries}
        defaultValue={defaultValues.country}
        isSearchable
        onFocus={onFocusCountryHandler}
        options={parseCountriesListIntoOptions(countriesList)}
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
