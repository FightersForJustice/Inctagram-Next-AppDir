import React, { useState, ReactNode, FormEvent, Fragment } from "react";
import Autosuggest from "react-autosuggest";
import citiesData from "../../../../../../public/cities.json";

import "./CitySelector.scss";
import { FieldError } from "react-hook-form";

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
  const [value, setValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const getSuggestions = (inputValue: string): string[] => {
    const inputValueLowerCase = inputValue.toLowerCase();
    return citiesData
      .filter(
        (city: City) =>
          city.name.toLowerCase().includes(inputValueLowerCase) ||
          city.country.toLowerCase().includes(inputValueLowerCase),
      )
      .map((city: City) => `${city.name}, ${city.country}`);
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event: React.FormEvent<any>, { suggestionValue }: { suggestionValue: string }) => {
    setValue(suggestionValue);
  };

  const inputProps = {
    placeholder: "Enter a city",
    className: error ? "inputSelector__error" : "inputSelector",
    id: id,
    value: userCity ? userCity : value,
    onChange: (event: FormEvent, { newValue }: { newValue: string }) => {
      setValue(newValue);
      setUserCity(newValue);
    },
  };

  return (
    <div className="autosuggest-container">
      <label className={"labelInput"}>{translate(translateName)}</label>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={(suggestion) => <Fragment>{suggestion}</Fragment>}
        inputProps={inputProps}
      />
      {error && <p className={"city__error"}>{errorMessage}</p>}
    </div>
  );
};

export default CitySelector;
