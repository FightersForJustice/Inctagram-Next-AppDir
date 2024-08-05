import React from 'react';
import s from '@/app/(authorized)/home/HomePagePost/HomePagePost.module.scss';
import Image from 'next/image';
import { ReadMoreButton } from '@/components/ReadMoreButton/ReadMoreButton';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/appRoutes/routes';
import Link from 'next/link';

type Props = {
  userName: string | undefined;
  description: string;
  avatar: string;
  ownerId: number;
};

export const HomePostDescription: React.FC<Props> = ({
                                                       description,
                                                       avatar,
                                                       userName,
                                                       ownerId,
                                                     }) => {
  const { t } = useTranslation();
  const translateReadMoreButton = (key: string): string => t(`ReadMore.${key}`);

  return (
    <div className={s.post__desc}>
      <Link href={ROUTES.PROFILE + `${'/' + ownerId}`} className={s.post__desc__link}>
        <Image
          src={avatar ?? '/img/create-post/no-image.png'}
          alt={'ava'}
          width={36}
          height={36}
          className={s.post__desc__ava}
        />
      </Link>
      <p className={s.post__text}>
        <Link href={ROUTES.PROFILE + `${'/' + ownerId}`}>
          <span className={s.post__text__name}>{userName}</span>
        </Link><br />
        <ReadMoreButton
          text={description}
          maxLength={80}
          moreText={translateReadMoreButton('showMore')}
          lessText={translateReadMoreButton('hide')}
        />
      </p>
    </div>
  );
};
