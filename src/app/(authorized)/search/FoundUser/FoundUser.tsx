import React from 'react';
import Image from 'next/image';

import s from './FoundUser.module.scss';
import { UserType } from '@/api/users.api';
import { useRouter } from 'next/navigation';

type Props = {
  user: UserType;
};

export const FoundUser: React.FC<Props> = ({ user }) => {
  const { userName, firstName, lastName, id, avatars } = user;
  const router = useRouter();

  const avatarSrc = avatars[0] ? avatars[0].url : '/img/avatar.jpg';

  const goToProfile = () => {
    router.push('/profile/' + id);
  };

  return (
    <div className={s.search__wrapper} onClick={goToProfile}>
      <div className={s.search__header}>
        <Image
          className={s.search__header__image}
          src={avatarSrc}
          alt={'avatar'}
          width={50}
          height={50}
        />
        <div>
          <p className={s.search__username}>{userName}</p>
          <p className={s.search__name}>
            {firstName} {lastName}
          </p>
        </div>
      </div>
    </div>
  );
};
