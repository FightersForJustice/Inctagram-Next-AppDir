import React, { useState, ReactNode, FormEvent, Fragment } from 'react';
import Autosuggest from 'react-autosuggest';
import citiesData from '../../../../../public/cities.json';

import './CitySelector.scss';
import { FieldError } from 'react-hook-form';

interface City {
  name: string;
  country: string;
}

interface CitySelectorProps {
  translate: (value: string) => ReactNode;
  translateName: string;
  error: FieldError | undefined;
  errorMessage: string | undefined;
  id: string;
  setUserCity: (value: string) => void;
  userCity: string;
}

const CitySelector: React.FC<CitySelectorProps> = ({
  translate,
  translateName,
  errorMessage,
  error,
  id,
  userCity,
  setUserCity,
}) => {
  const [value, setValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const getSuggestions = (inputValue: string): string[] => {
    const inputValueLowerCase = inputValue.toLowerCase();
    return citiesData
      .filter(
        (city: City) =>
          city.name.toLowerCase().includes(inputValueLowerCase) ||
          city.country.toLowerCase().includes(inputValueLowerCase)
      )
      .map((city: City) => `${city.name}, ${city.country}`);
  };

  const inputProps = {
    placeholder: 'Enter a city',
    className: error ? 'inputSelector__error' : 'inputSelector',
    id: id,
    value: userCity ? userCity : value,
    onChange: (event: any, { newValue }: { newValue: string }) => {
      setValue(newValue);
      setUserCity(newValue);
    },
  };

  return (
    <div className="autosuggest-container">
      <label className={'labelInput'}>{translate(translateName)}</label>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={({ value }) => {
          setValue(value);
          setSuggestions(getSuggestions(value));
        }}
        onSuggestionSelected={(_, { suggestionValue }) =>
          setValue(suggestionValue)
        }
        onSuggestionsClearRequested={() => setSuggestions([])}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={(suggestion) => <div>{suggestion}</div>}
        inputProps={inputProps}
      />
      {error && <p className={'city__error'}>{errorMessage}</p>}
    </div>
  );
};

export default CitySelector;
