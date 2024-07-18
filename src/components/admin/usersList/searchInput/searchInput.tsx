import Image from 'next/image';
import { ChangeEvent } from 'react';
import s from './SearchContent.module.scss';

type PropType = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const SearchInput = (prop: PropType) => {
  return (
    <div className={s.search}>
      <h2 className={s.search__title}>Search</h2>
      <input
        className={s.search__input}
        type="text"
        onChange={prop.onChange}
        placeholder={'Search'}
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
