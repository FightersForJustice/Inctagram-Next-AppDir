'use client';

import React from 'react';
import { Pagination } from '@/components/Pagination/Pagination';
import { headerList } from '@/components/Table/headTypes';
import {
  PaymentType,
  ResultUserPaymentsType,
  UsersListType,
  UsersPaymentType,
} from '@/components/Table/rowTypes';
import { Table } from '@/components/Table/Table';
import { useDebounce } from '@/utils/useDebaunce';
import { useGetParams } from '@/utils/useGetParams';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetAllUsersQuery } from '@/queries/users/users.generated';
import { Follow, SortDirection, UserBlockStatus } from '@/types';
import { BanUserModal } from './modals/banUser/banUserModal';
import { DeleteUserModal } from './modals/deleteUserModal/deleteUserModal';
import { UnBanUserModal } from './modals/unBanUser/unBanUserModal';
import { BaseSelector, optionsType } from '@/components/Selector/Selector';
import { filterValues, selectorOptions, urlOptions } from '../shared/constants';
import { SearchInput } from '../shared/searchInput/searchInput';
import s from './usersList.module.scss';

export const UsersListClient = () => {
  const url = useGetParams();
  const urlParams = useSearchParams()!;
  const [currentPage, setCurrentPage] = useState(
    Number(urlParams.get('pageNumber')) !== null &&
    Number(urlParams.get('pageNumber')) !== 0
      ? Number(urlParams.get('pageNumber'))
      : 1
  );
  const [paymentsPerPage, setPaymentsPerPage] = useState(
    Number(urlParams.get('pageSize')) !== null &&
      Number(urlParams.get('pageSize')) !== 0
      ? Number(urlParams.get('pageSize'))
      : 10
  );

  const [visiblePopup, setVisiblePopup] = useState(false);
  const [visiblePopupId, setVisiblePopupId] = useState('');
  const [editUser, setEditUser] = useState('');
  const [showAreYouSureModal, setShowAreYouSureModal] = useState(false);

  const params = new URLSearchParams(urlParams.toString());
  const [currentUrlName, setCurrentUrlName] = React.useState(
    (urlParams.get('searchTerm') as string) !== null
      ? (urlParams.get('searchTerm') as string)
      : ''
  );
  let searchInputHandler = useDebounce(currentUrlName, 400);
  const setNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUrlName(event.currentTarget.value);
  };

  const nextRouter = useRouter();
  const { t } = useTranslation();
  const translate = (key: string): string => t(`Admin.${key}`);
  let currentParams = url
    ?.slice(1)
    .split('&')
    .map((el) => {
      return el.split('=');
    });

  const getSortValues = currentParams?.filter((el) => el[0] === 'sortBy')[0];
  const getSearchValue = currentParams?.filter(
    (el) => el[0] === 'searchTerm'
  )[0];
  const getSortDirection = currentParams?.filter(
    (el) => el[0] === 'sortDirection'
  )[0];
  const getFilter = currentParams?.filter((el) => el[0] === 'statusFilter')[0];
  const { data, loading, error, refetch } = useGetAllUsersQuery({
    variables: currentParams?.length
      ? {
          pageSize: paymentsPerPage,
          pageNumber: currentPage,
          sortBy: getSortValues ? getSortValues[1] : '',
          sortDirection: getSortDirection
            ? (getSortDirection[1] as SortDirection)
            : ('desc' as SortDirection),
          searchTerm: getSearchValue ? getSearchValue[1] : '',
          statusFilter: getFilter
            ? (getFilter[1] as UserBlockStatus)
            : ('ALL' as UserBlockStatus),
        }
      : {},
  });
  const tableVariant = 'UsersList';

  const paginate = (pageNumber: number) => {
    params.set('pageNumber', pageNumber.toString());
    setCurrentPage(pageNumber);
    return nextRouter.push(`userslist?${params.toString()}`);
  };
  const paginatePageSize = (pageNumber: number) => {
    params.set('pageSize', pageNumber.toString());
    setPaymentsPerPage(pageNumber);
    return nextRouter.push(`userslist?${params.toString()}`);
  };

  const usersData = data
    ? data.getUsers.users.map((el) => {
        const correctData = {
          createdAt: el.createdAt,
          email: el.email,
          id: el.id,
          userBan: el.userBan
            ? {
                reason: el.userBan?.reason,
                createdAt: el.userBan.createdAt,
              }
            : null,
          userName: el.userName,
          profile: {
            userName: el.profile.userName,
          },
          moreAction: () => {},
          currentActionId: 0,
        };
        const resultData = {} as PaymentType;
        const result1Data = {} as UsersPaymentType;
        const result2Data = {} as Follow;
        const result4Data = {} as ResultUserPaymentsType;
        return Object.assign(
          result4Data,
          result2Data,
          correctData,
          resultData,
          result1Data
        );
      })
    : [];
  const resultHeaderTitle = headerList[tableVariant].map((el) => {
    return translate(el);
  });
  const resultFilterOptions = selectorOptions.map((el) => {
    return {
      value: el.value,
      label: translate(el.label),
    };
  });

  // reserve
  // const clearFiltersHandler = () => {
  //   nextRouter.replace('/admin/usersList');
  //   setCurrentUrlName('');
  // };

  React.useEffect(() => {
    params.set('searchTerm', searchInputHandler);
    if (!searchInputHandler.trim()) {
      params.delete('searchTerm');
    }
    setCurrentUrlName(searchInputHandler);
    nextRouter.push(`/admin/userslist?${params.toString()}`);
  }, [searchInputHandler]);

  React.useEffect(() => {
    refetch();
    console.log('refetch');
  }, [url, refetch]);

  const getCurrentUserName = data?.getUsers.users?.find(
    (el) => el.id === Number(visiblePopupId)
  )?.userName;

  const selectHandler = (e: optionsType) => {
    const key = 'statusFilter';
    params.set(key, urlOptions[e.value]);
    return nextRouter.push(`userslist?${params.toString()}`);
  };

  const filterValue = params.get('statusFilter');

  //react select issue
  //https://github.com/ndom91/react-timezone-select/issues/108
  return (
    <div>
      <div className={s.container}>
        <SearchInput onChange={setNameHandler} />
        <BaseSelector
          defaultValue={
            filterValue
              ? {
                  label: translate(filterValues[filterValue].label),
                  value: filterValues[filterValue].value,
                }
              : resultFilterOptions[0]
          }
          id={'1filterUserSelect'}
          name={'filterUserSelect'}
          selectorsLabelName={''}
          options={resultFilterOptions}
          onChange={selectHandler}
        />
      </div>
      <Table
        data={usersData}
        headTitles={resultHeaderTitle}
        Row={tableVariant}
        visiblePopup={visiblePopup}
        setVisiblePopup={setVisiblePopup}
        visiblePopupId={visiblePopupId}
        setVisiblePopupId={setVisiblePopupId}
        setEditUser={setEditUser}
        setShowAreYouSureModal={setShowAreYouSureModal}
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        paginate={paginate}
        totalPayments={data ? data.getUsers.pagination.totalCount : [].length}
        paymentsPerPage={paymentsPerPage}
        setPaymentsPerPage={paginatePageSize}
      />
      {showAreYouSureModal && editUser === 'ban' && (
        <BanUserModal
          getUsers={refetch}
          visiblePopupId={visiblePopupId}
          setShowAreYouSureModal={setShowAreYouSureModal}
          setVisiblePopup={setVisiblePopup}
          name={getCurrentUserName}
        />
      )}
      {showAreYouSureModal && editUser === 'unban' && (
        <UnBanUserModal
          getUsers={refetch}
          visiblePopupId={visiblePopupId}
          setShowAreYouSureModal={setShowAreYouSureModal}
          setVisiblePopupId={() => setVisiblePopupId('')}
          setVisiblePopup={setVisiblePopup}
          name={getCurrentUserName}
        />
      )}
      {showAreYouSureModal && editUser === 'delete' && (
        <DeleteUserModal
          visiblePopupId={visiblePopupId}
          setShowAreYouSureModal={setShowAreYouSureModal}
          setVisiblePopup={setVisiblePopup}
          name={getCurrentUserName}
        />
      )}
    </div>
  );
};
