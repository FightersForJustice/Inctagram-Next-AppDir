import Image from 'next/image';
import { ChangeEvent } from 'react';
import s from './SearchContent.module.scss';
import { useTranslation } from 'react-i18next';

type PropType = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

export const SearchInput = (prop: PropType) => {

  const { t } = useTranslation();
  const translate = (key: string): string => t(`Navigation.${key}`);

  return (
    <div className={s.search}>
      <input
        className={s.search__input}
        type="text"
        onChange={prop.onChange}
        placeholder={translate('search')}
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
