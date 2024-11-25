'use strict';

import {
  getCountRegisterUsers,
  getPublicPostsPage,
} from '@/app/(not_authorized)/(public-info)/public-profile/[id]/actions';
import CounterRegisterUser from '@/components/CounterRegisterUser/CounterRegisterUser';
import { CountRegisterUser } from '@/api/public-profile.api';
import { PublicPosts } from '@/app/(not_authorized)/(public-info)/public-post-page/PublicPosts/PublicPosts';

import s from './PublicPage.module.scss';
import { headers } from 'next/headers';

type Props = {
  searchParams?: { [key: string]: string | undefined };
};

const PublicPostPage = async ({ searchParams }: Props) => {
  const publicPostPageData = await getPublicPostsPage(0);
  const publicCountRegisterUsers: CountRegisterUser =
    await getCountRegisterUsers();

  const initialPosts = publicPostPageData?.items;

  const postIdFromUrl = searchParams?.post;

  const headersList = headers();
  const idHeaders = headersList.get('id') as string;
  const myId = parseInt(idHeaders, 10);
  const accessToken = headersList.get('accessToken') as string;

  return (
    <div className={s.wrapper}>
      <CounterRegisterUser count={publicCountRegisterUsers.totalCount} />
      {initialPosts && <PublicPosts initialPosts={initialPosts} postIdFromUrl={postIdFromUrl} />}
    </div>
  );
};

export default PublicPostPage;

