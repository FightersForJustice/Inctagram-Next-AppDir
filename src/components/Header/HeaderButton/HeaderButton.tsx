'use client'
import React from 'react';
import s from '@/components/Header/Header.module.scss';
import Link from 'next/link';
import { AUTH_ROUTES } from '@/appRoutes/routes';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';



const HeaderButton = () => {
  const { t } = useTranslation()
  const translate = (key: string): string => t(`Header.notifications.${key}`)
  return (
    <div className={s.buttonContainer}>
        <>
          <div className={s.logIn}>
            <Link href={AUTH_ROUTES.SIGN_IN} >
              {translate('logIn')}
            </Link>
          </div>
          <div className={s.signUp}>
            <Link href={AUTH_ROUTES.SIGN_UP} >
              {translate('signUp')}
            </Link>
          </div>
        </>
    </div>
  );
};

export default HeaderButton;