'use client';
import Image from 'next/image';
import s from './ProfileInfo.module.scss';
import Link from 'next/link';
import { UserProfile } from '../types';
import { useTranslations } from 'next-intl';

type Props = {
  userData: UserProfile;
  myProfile: boolean;
};
export const ProfileInfo = ({ userData, myProfile }: Props) => {
  const t = useTranslations('MyProfilePage');
  return (
    <>
      <div className={s.profile}>
        <div className={s.left}>
          <Image
            src="/img/profile/avatar.png"
            alt="avatar"
            width={204}
            height={204}
            className={s.avatar}
          />
        </div>
        <div className={s.right}>
          <div className={s.info}>
            <div className={myProfile ? s.topMyProfile : s.top}>
              <div className={s.blockUser}>
                <div className={s.name}>URLProfiele</div>
                <div className={s.statistics}>
                  <div>
                    <p>0</p>
                    <p>{t('subscriptions')}</p>
                  </div>
                  <div>
                    <p>0</p>
                    <p>{t('subscribers')}</p>
                  </div>
                  <div>
                    <p>0</p>
                    <p>{t('publications')}</p>
                  </div>
                </div>
              </div>
              <div className={s.btn}>
                {myProfile ? (
                  <Link href={'/settings-profile'} className={s.settings}>
                    {t('btnName')}
                  </Link>
                ) : (
                  <>
                    <Link href="#" className={s.btnPrimary}>
                      {t('SubscribersModal.subBtn')}
                    </Link>
                    <Link href="#" className={s.message}>
                      {t('btnSendMessage')}
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className={s.descriptions}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
