'use strict';

import {
  getCountRegisterUsers,
  getPublicPostsPage,
} from '@/app/(not_authorized)/(public-info)/public-profile/[id]/actions';
import { PostType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';
import s from './PublicPage.module.scss';
import CounterRegisterUser from '@/components/CounterRegisterUser/CounterRegisterUser';
import { CountRegisterUser } from '@/api/public-profile.api';
import { PublicPosts } from '@/app/(not_authorized)/(public-info)/public-post-page/PublicPosts/PublicPosts';


type Props = {
  searchParams?: { [key: string]: string | undefined };
};

const PublicPostPage = async ({ searchParams }: Props) => {
  const publicPostPageData = await getPublicPostsPage();
  const publicCountRegisterUsers: CountRegisterUser =
    await getCountRegisterUsers();

  const postIdFromUrl = searchParams?.post;

  return (
    <div className={s.wrapper}>
      <CounterRegisterUser count={publicCountRegisterUsers.totalCount} />
      <div className={s.container}>
        {publicPostPageData.items.map((post: PostType) => (
          <PublicPosts key={post.id} post={post} postIdFromUrl={postIdFromUrl} />
        ))}
      </div>
    </div>
  );
};

export default PublicPostPage;

