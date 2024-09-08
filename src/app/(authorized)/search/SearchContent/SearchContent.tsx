import React, { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';

import s from './SearchContent.module.scss';
import { FoundUser } from '../FoundUser';
import { useGetUsersQuery, UserType } from '@/api/users.api';

export const SearchContent = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [search, setSearch] = useState('');

  const { data, isSuccess, isError } = useGetUsersQuery({
    search: 'steels', // remove hardcode
  });

  useEffect(() => {
    isSuccess && setUsers(data.items);
  }, [data, isSuccess, isError]);

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearch(value);
  };

  const usersList = users.map((user: UserType) => (
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
