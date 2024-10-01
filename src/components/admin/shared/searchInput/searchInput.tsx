import Image from 'next/image';
import { ChangeEvent } from 'react';
import s from './SearchContent.module.scss';

type PropType = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

export const SearchInput = (prop: PropType) => {
  return (
    <div className={s.search}>
      <input
        className={s.search__input}
        type="text"
        onChange={prop.onChange}
        placeholder={'Search'}
        value={prop.value}
      />
      <Image
        className={s.search__input__search}
        src={'/img/modal/search.svg'}
        alt={'search'}
        width={20}
        height={20}
      />
    </div>
  );
};
