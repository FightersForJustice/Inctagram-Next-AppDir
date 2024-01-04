import { useState } from 'react';

import { GetResponse } from '@/api/profile.api';
import { InfiniteScrollMyPosts } from './InfiniteScrollMyPosts';
import { PostFix } from './PostFix';
import { PostModal } from '@/components/Modals/PostModal';
import { PostsItem } from '@/api/posts.api';

import { AvatarProfile } from '@/components/Profile/Avatar/AvatarProfile';
import { UserNameProfile } from '@/components/Profile/UserName/UserNameProfile';
import { UserInfoProfile } from '@/components/Profile/UserInfo/UserInfoProfile';
import { SubscriptionsProfile } from '@/components/Profile/Subscriptions/SubscriptionsProfile';

import s from '../MyProfile.module.scss';

type Props = {
  setShowSubscriptionsModal: (value: boolean) => void;
  setShowSubscribersModal: (value: boolean) => void;
  paidAccount: boolean;
  userData: GetResponse;
};
export const Profile = ({
  setShowSubscriptionsModal,
  setShowSubscribersModal,
  paidAccount,
  userData,
}: Props) => {
  const [openPostModal, setOpenPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<number>();
  const [userPosts, setUserPosts] = useState<PostsItem[]>([]);

  const [postChanges] = useState(false);

  const getUserPosts = (postsAmount: PostsItem[]) => {
    setUserPosts(postsAmount);
  };
  //fetch user data here
  //mocked user Data
  const avatarUrl = undefined;
  const userName = undefined;
  const aboutMe = undefined;
  const userPostsLength = undefined;
  paidAccount = true;

  return (
    <>
      <div className={s.profile}>
        <div className={s.gridContainer}>
          <div className={s.avatar}>
            <AvatarProfile avatar={avatarUrl} />
          </div>
          <div className={s.user}>
            <UserNameProfile userName={userName} paidAccount={paidAccount} />
          </div>
          <div className={s.userInfo}>
            <UserInfoProfile aboutMe={aboutMe} />
          </div>
          <div className={s.subscriptions}>
            <SubscriptionsProfile
              setShowSubscriptionsModal={setShowSubscriptionsModal}
              setShowSubscribersModal={setShowSubscribersModal}
              userPostsLength={userPostsLength}
            />
          </div>
        </div>
        <InfiniteScrollMyPosts
          postChanges={postChanges}
          setOpen={setOpenPostModal}
          setSelectedPost={setSelectedPost}
          getUserPosts={getUserPosts}
        />
      </div>

      {openPostModal && (
        <PostModal width={'972px'} onClose={() => setOpenPostModal(false)}>
          <PostFix
            onClose={() => setOpenPostModal(false)}
            postId={selectedPost}
            avatar={userData?.avatars[0]?.url}
            userName={userData?.userName}
            setOpenPostModal={setOpenPostModal}
          />
        </PostModal>
      )}
    </>
  );
};
