'use client';

import Select from 'react-select';
import { FocusEventHandler } from 'react';

import { SelectorStyles } from './SelectorStyles';
import s from './Selector.module.scss';

export type optionsType = {
  value: string;
  label: string;
};

export const BaseSelector = ({
  value,
  id,
  name,
  defaultValue,
  selectorsLabelName,
  isSearchable,
  isLoading,
  isDisabled,
  options,
  placeholder,
  onFocus,
  onChange,
  isClearable,
}: {
  value?: any;
  id: string;
  name: string;
  defaultValue?: optionsType | null;
  selectorsLabelName: string;
  isSearchable?: boolean;
  isLoading?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
  options: optionsType[] | null;
  placeholder?: string;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onChange?: (newValue: any, actionMeta: any) => void;
}) => {
  return (
    <div className={s.selectorContainer}>
      <label htmlFor={id} className={s.selectorLabel}>
        {selectorsLabelName}
      </label>

      <Select
        value={value}
        id={id}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={s.selector}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isSearchable={isSearchable}
        options={options ?? undefined}
        styles={SelectorStyles}
        onFocus={onFocus}
        onChange={onChange}
      />
    </div>
  );
};
