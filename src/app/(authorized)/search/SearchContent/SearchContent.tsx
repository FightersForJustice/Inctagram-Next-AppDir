'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';

import s from './SearchContent.module.scss';
import { FoundUser } from '../FoundUser';
import { useDebounce } from '@/utils/useDebaunce';
import { useRouter } from 'next/navigation';

type Props = {
  users: any;
};

export const SearchContent: React.FC<Props> = ({ users }) => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    if (debouncedSearch) {
      router.push('?search=' + debouncedSearch);
    }
  }, [debouncedSearch]);

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearch(value);
  };

  const usersList = users.map((user: any) => (
    <FoundUser key={user.id} user={user} />
  ));

  return (
    <div style={{ gridArea: 'profile' }}>
      <div className={s.search}>
        <h2 className={s.search__title}>Search</h2>
        <input
          className={s.search__input}
          type="text"
          value={search}
          onChange={onChangeSearch}
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
      <div className={s.search__container}>
        <p className={s.search__container__title}>Recent requests</p>
        {users.length > 0 ? (
          <div>{usersList}</div>
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
