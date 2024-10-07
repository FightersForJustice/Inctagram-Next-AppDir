import { StylesConfig } from 'react-select';

export const SelectorStyles = (isChanged: boolean | undefined): StylesConfig => ({
  control: (styles, { isDisabled, menuIsOpen  }) => ({
    ...styles,
    opacity: isDisabled ? '0.3' : '1',
    backgroundColor: menuIsOpen ? '#0d0d0d' : 'transparent',
    borderRadius: '2px',
    color: 'white',
    borderColor: '#4c4c4c',
    ':hover': {
      ...styles[':hover'],
      cursor: 'pointer',
      borderColor: '#4c4c4c',
    },
  }),
  option: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: isFocused ? '#333' : '#0d0d0d',
    color: isFocused ? '#397DF6' : '#8D9094',
    padding: '8px 12px',
    ':hover': {
      ...styles[':hover'],
      cursor: 'pointer',
    },
    ':active': {
      backgroundColor: '#333',
    },
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: '#0d0d0d',
    outline: '1px solid #2684FF',
    outlineTop: '0',
    borderRadius: '2px',
    marginTop: '1px',
  }),
  menuList: (styles) => ({
    ...styles,
    maxHeight: '160px',
    padding: '0',
  }),
  singleValue: (styles) => ({
    ...styles,
    color: !isChanged ? '#8D9094' : 'white',
  }),
  input: (styles) => ({
    ...styles,
    color:'white',
  }),
});
