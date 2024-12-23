import Image from 'next/image';
import { ReadMoreButton } from '@/components/ReadMoreButton/ReadMoreButton';
import { getTimeAgoText } from '@/utils';
import { useGetLanguage } from '@/redux/hooks/useGetLanguage';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import s from './../postsList.module.scss';
import React, { useState } from 'react';
import { ItemsType } from '@/components/admin/postsList/postsList';
import { PostType } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/types';
import { Post } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/Posts/Post';
import { ImagesAmount } from '@/components/ImagesAmount';
import { BanUserModal } from '@/components/admin/usersList/modals/banUser/banUserModal';
import { UnBanUserModal } from '@/components/admin/usersList/modals/unBanUser/unBanUserModal';

type PropsType = {
  posts: ItemsType[];
};

export const PostClient = (posts: PropsType) => {
  const language = useGetLanguage();
  const { t } = useTranslation();
  const translate = (key: string): string => t(`Time.${key}`);
  const translateReadMoreButton = (key: string): string => t(`ReadMore.${key}`);
  const [editUser, setEditUser] = useState<'ban' | 'unban' | ''>('');
  const [showAreYouSureModal, setShowAreYouSureModal] = useState(false);
  const [user, setUser] = useState<{ name: string; id: string } | null>(null);

  const mapPostData = (
    el: ItemsType
  ): PostType & { userBan: { reason: string } | null } => {
    return {
      id: el.id,
      userName: el.postOwner.userName,
      ownerId: el.ownerId,
      description: el.description,
      location: '',
      userBan: el.userBan,
      images:
        el.images?.map((img) => ({
          url: img?.url || '',
          width: img?.width || 0,
          height: img?.height || 0,
          fileSize: img?.fileSize || 0,
          uploadId: img?.id?.toString() || '',
        })) || [],
      createdAt: el.createdAt,
      updatedAt: el.updatedAt,
      avatarOwner:
        el.postOwner.avatars?.[0]?.url || '/img/create-post/no-image.png',
      owner: {
        firstName: '',
        lastName: '',
      },
      isLiked: false,
      likesCount: 0,
    };
  };

  return posts.posts.map((el) => {
    const post = mapPostData(el);
    const time = getTimeAgoText(el.createdAt, language, translate);

    const openBlockModal = () => {
      setUser({ name: post.userName, id: String(post.ownerId) });
      if (post.userBan) {
        setEditUser('unban');
      } else {
        setEditUser('ban');
      }
      setShowAreYouSureModal(true);
    };

    const blockImg = post.userBan ? '/img/block-red.svg' : '/img/block.svg';

    return (
      <div key={post.id} className={s.postContainer}>
        <div className={s.imageContainer}>
          <Post
            post={post}
            myProfile={false}
            isOpenByLink={false}
            type={'admin'}
          />
          {post.images.length > 1 && (
            <ImagesAmount imagesLength={post.images.length} />
          )}
        </div>
        <div className={s.userContainer}>
          <Link href={'/admin/profile/photos' + `${'/' + post.ownerId}`}>
            <div className={s.user}>
              <Image
                src={post.avatarOwner || '/img/create-post/no-image.png'}
                alt={'ava'}
                width={36}
                height={36}
                className={s.avatar}
              />
              <h3 className={s.userName}>{post.userName} </h3>
            </div>
          </Link>
          <button onClick={openBlockModal}>
            <Image
              className={s.blockButton}
              alt="block"
              src={blockImg}
              width={24}
              height={24}
            />
          </button>
        </div>
        <p className={s.time}>{time}</p>
        <div className={s.description}>
          <ReadMoreButton
            text={post.description}
            maxLength={80}
            moreText={translateReadMoreButton('showMore')}
            lessText={translateReadMoreButton('hide')}
          />
        </div>
        {showAreYouSureModal && editUser === 'ban' && (
          <BanUserModal
            visiblePopupId={user?.id}
            setShowAreYouSureModal={setShowAreYouSureModal}
            setVisiblePopup={() => {}}
            name={user?.name}
          />
        )}
        {showAreYouSureModal && editUser === 'unban' && (
          <UnBanUserModal
            visiblePopupId={user?.id}
            setShowAreYouSureModal={setShowAreYouSureModal}
            setVisiblePopupId={() => {}}
            setVisiblePopup={() => {}}
            name={user?.name}
          />
        )}
      </div>
    );
  });
};
