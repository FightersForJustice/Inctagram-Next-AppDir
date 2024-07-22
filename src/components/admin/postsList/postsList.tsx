'use client';

import React from 'react';
import { Pagination } from '@/components/Pagination/Pagination';
import { headerList } from '@/components/Table/headTypes';
import Image from 'next/image';
import {
  PaymentType,
  UsersListType,
  UsersPaymentType,
} from '@/components/Table/rowTypes';
import { Table } from '@/components/Table/Table';
import { useDebounce } from '@/utils/useDebaunce';
import { useGetParams } from '@/utils/useGetParams';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchInput } from '../shared/searchInput/searchInput';
import { Avatar, CurrencyType, SortDirection } from '@/types';
import s from './postsList.module.scss';
import { useGetCurrentPostsQuery } from '@/queries/posts/posts.generated';
import { PublicPost } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/Posts/PublicPost/PublicPost';
import Link from 'next/link';
import { ReadMoreButton } from '@/components/ReadMoreButton/ReadMoreButton';

export const PostsListClient = () => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [visiblePopupId, setVisiblePopupId] = useState('');
  const urlParams = useSearchParams()!;
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
  const url = useGetParams();
  const nextRouter = useRouter();
  const { t } = useTranslation();
  const translate = (key: string): string => t(`Admin.postslist.${key}`);
  // const translate = (key: string): string => t(`Admin.PaymentsList.${key}`);
  let currentParams = url
    ?.slice(1)
    .split('&')
    .map((el) => {
      return el.split('=');
    });

  const getSortValues = currentParams?.filter((el) => el[0] === 'sortBy')[0];
  const getSortDirection = currentParams?.filter(
    (el) => el[0] === 'sortDirection'
  )[0];
  const getPageSize = currentParams?.filter((el) => el[0] === 'pageSize')[0];
  const getSearchValue = currentParams?.filter(
    (el) => el[0] === 'searchTerm'
  )[0];
  
  const { data, loading, error, refetch } = useGetCurrentPostsQuery({
    variables: currentParams?.length
      ? {
          pageSize: getPageSize ? Number(getPageSize[1]) : 10,
          // endCursorPostId: 1,
          sortBy: getSortValues ? getSortValues[1] : '',
          sortDirection: getSortDirection
            ? (getSortDirection[1] as SortDirection)
            : ('desc' as SortDirection),
          searchTerm: getSearchValue ? getSearchValue[1] : '',
        }
      : {},
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage, setPaymentsPerPage] = useState(5);
  // for pagination
  const lastPaymentIndex = currentPage * paymentsPerPage;
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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
    nextRouter.push(`/admin/postslist?${params.toString()}`);
  }, [searchInputHandler]);

  React.useEffect(() => {
    refetch();
  }, [url, refetch]);

  const postsImages = () => {
    return data?.getPosts.items.slice(0, 4).map((el, i) => {
      // const userProfile = await getPublicProfile(i.ownerId);

      return (
        <>
          {/* <div className={s.postWrapper}>
            <div key={i} className={s.postContainer}>
              <Image
                src={
                  el.images?.length
                    ? el.images[0].url
                    : '/img/profile/posts/post1.png'
                }
                alt={'post'}
                width={234}
                height={228}
                className={s.imagePost}
                // onClick={onOpenPost}
              />
            </div>
            <Link href={'/admin/postslist/profile' + `${'/' + el.ownerId}`}>
              <div className={s.userContainer}>
                <Image
                  src={
                    el.postOwner.avatars.length
                      ? el.postOwner.avatars[0].url
                      : '/img/create-post/no-image.png'
                  }
                  alt={'ava'}
                  width={36}
                  height={36}
                  className={k.post__avatar}
                />
                <h3 className={s.userName}>{post.userName} </h3>
              </div>
            </Link>
            <p className={s.time}>{time}</p>
          </div>
          <div className={s.description}>
            <ReadMoreButton
              text={el.description}
              maxLength={80}
              moreText={translateReadMoreButton('showMore')}
              lessText={translateReadMoreButton('hide')}
            />
          </div> */}
        </>
      );
    });
  };

  //react select issue
  //https://github.com/ndom91/react-timezone-select/issues/108
  return (
    <div>
      <div className={s.container}>
        <SearchInput onChange={setNameHandler} />
      </div>
      <div className={s.containerPosts}>
        {
          // postsImages()
        }
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        paginate={paginate}
        totalPayments={data ? data.getPosts.totalCount : 0}
        paymentsPerPage={paymentsPerPage}
        setPaymentsPerPage={setPaymentsPerPage}
      />
    </div>
  );
};
