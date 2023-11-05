import React from 'react';
import Image from 'next/image';

import s from './SearchContent.module.scss';
import { FoundUser } from '../FoundUser';

export const SearchContent = () => {
  return (
    <div style={{ gridArea: 'profile' }}>
      <div className={s.search}>
        <h2 className={s.search__title}>Search</h2>
        <input className={s.search__input} type="text" placeholder={'Search'} />
        <Image
          className={s.search__input__search}
          src={'/img/modal/search.svg'}
          alt={'search'}
          width={20}
          height={20}
        />
      </div>
      <div className={s.search__container}>
        <p className={s.search__container__title}>Recent requests</p>
        {true ? (
          <div>
            <FoundUser />
            <FoundUser />
            <FoundUser />
            <FoundUser />
            <FoundUser />
          </div>
        ) : (
          <div className={s.search__empty}>
            <p className={s.search__empty__title}>
              Oops! This place looks empty!
            </p>
            <p className={s.search__empty__text}>No recent requests</p>
          </div>
        )}
      </div>
    </div>
  );
};
