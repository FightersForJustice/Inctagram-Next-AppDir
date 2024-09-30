'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';

import s from './SearchContent.module.scss';
import { FoundUser } from '../FoundUser';
import { useDebounce } from '@/utils/useDebaunce';
import { UserType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';
import { getUsers } from '@/app/(authorized)/search/SearchContent/data';

type Props = {
  accessToken: string | null;
};

export const SearchContent: React.FC<Props> = ({ accessToken }) => {
  const [search, setSearch] = useState('');
  const [searchedUsers, setSearchedUsers] = useState<UserType[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoad, setIsLoad] = useState(false);

  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    setSearchedUsers([]);
    setPageNumber(1);
    getMoreSearchedUsers();
  }, [debouncedSearch]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (
  //       window.innerHeight + window.scrollY >=
  //       document.documentElement.scrollHeight - 300
  //     ) {
  //       if (!isLoad) {
  //         getMoreSearchedUsers();
  //       }
  //     }
  //   };
  //
  //   window.addEventListener('scroll', handleScroll);
  //
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [searchedUsers]);

  const getMoreSearchedUsers = async () => {
    if (!accessToken || !debouncedSearch || isLoad) return;
    setIsLoad(true);

    try {
      const data = await getUsers(accessToken, {
        search: debouncedSearch,
        pageNumber: pageNumber,
      });
      if (data) {
        const newUsers = data.items;
        setSearchedUsers((prev) => [...prev, ...newUsers]);
        if (newUsers.length > 0) {
          setPageNumber(data.page + 1);
        }
      }
    } finally {
      setIsLoad(false);
    }
  };

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearch(value);
  };

  const usersList = searchedUsers.map((user: UserType) => (
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
        {searchedUsers.length > 0 ? (
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
