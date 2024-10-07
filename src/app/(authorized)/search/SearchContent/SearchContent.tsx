'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';

import s from './SearchContent.module.scss';
import { FoundUser } from '../FoundUser';
import { useDebounce } from '@/utils/useDebaunce';
import { UserType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';
import { getUsers } from '@/app/(authorized)/search/SearchContent/data';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  accessToken: string | null;
};

export const SearchContent: React.FC<Props> = ({ accessToken }) => {
  const searchFromUrl = useSearchParams().get('search');
  const router = useRouter();

  const defaultValues = {
    search: '',
    searchedUsers: [],
    pageNumber: 1,
    pagesCount: 1000,
  };

  const [search, setSearch] = useState(defaultValues.search);
  const [searchedUsers, setSearchedUsers] = useState<UserType[]>(
    defaultValues.searchedUsers
  );
  const [pageNumber, setPageNumber] = useState(defaultValues.pageNumber);
  const [pagesCount, setPagesCount] = useState(defaultValues.pagesCount);
  const [isLoad, setIsLoad] = useState(false);

  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    searchFromUrl && setSearch(searchFromUrl);
  }, []);

  useEffect(() => {
    setSearchedUsers(defaultValues.searchedUsers);
    setPageNumber(defaultValues.pageNumber);
    setPagesCount(defaultValues.pagesCount);
    getMoreSearchedUsers();
  }, [debouncedSearch]);

  useEffect(() => {
    let scrollTimeout: string | number | NodeJS.Timeout | undefined;
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        const windowHeight = window.innerHeight;
        const scrollTop = document.documentElement.scrollTop;
        const documentHeight = document.documentElement.offsetHeight;

        if (windowHeight + scrollTop >= documentHeight - 300 && !isLoad) {
          getMoreSearchedUsers();
        }
      }, 200);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoad]);

  const getMoreSearchedUsers = async () => {
    if (!accessToken || !debouncedSearch || pageNumber > pagesCount) return;
    setIsLoad(true);

    try {
      const data = await getUsers(accessToken, {
        search: debouncedSearch,
        pageNumber: pageNumber,
      });
      router.push(`?search=${debouncedSearch}`, { scroll: false });
      if (data) {
        const newUsers = data.items;
        setSearchedUsers((prev) => [...prev, ...newUsers]);
        setPagesCount(data.pagesCount);
        setPageNumber((prev) => prev + 1);
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
