import styles from './profileComponent.module.scss';
import Image from 'next/image';
import { User } from '@/types';
import { dateToFormat } from '@/utils/dateToFormat';
import { useTranslation } from 'react-i18next';

type UserType = {
  user: User;
};

export const ProfileContainer = ({ user }: UserType) => {
  const { t } = useTranslation();
  const translate = (key: string): string => t(`Admin.ProfileComponent.${key}`);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <Image
          src={
            user.profile?.avatars?.length
              ? (user.profile.avatars[0].url as string)
              : '/img/create-post/no-image.png'
          }
          width={36}
          height={36}
          alt={'avatar'}
        />
        <div>
          <div className={styles.name}>{user.userName}</div>
          <div className={styles.username}>{user.userName}</div>
        </div>
      </div>
      <div className={styles.profileDetails}>
        <div className={styles.detail}>
          <div className={styles.label}>{translate('id')}</div>
          <div className={styles.value}>{user.id}</div>
        </div>
        <div className={styles.detail}>
          <div className={styles.label}>{translate('createdProfile')}</div>
          <div className={styles.value}>{dateToFormat(user.createdAt)}</div>
        </div>
      </div>
    </div>
  );
};
