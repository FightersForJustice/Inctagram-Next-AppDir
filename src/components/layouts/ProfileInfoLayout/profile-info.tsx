'use client';

import React, { ReactNode } from 'react';
import { Loader } from '@/components/Loader';
import { NotFound } from '@/components/NotFound';
import { useGetCurrentUserQuery } from '@/queries/users/users.generated';
import { useTranslation } from 'react-i18next';
import { GoBack } from './backTo/buttonBack';
import { usePathname, useRouter } from 'next/navigation';
import { ProfileContainer } from './profileComponent/profileComponent';
import { User } from '@/types';

const ProfileInfo = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const currentId = pathname.split('/')
  console.log()
  const { t } = useTranslation();
  const translate = (key: string): string => t(`NotFoundPage.${key}`);
  const translateProfile = (key: string): string => t(`Admin.profile.${key}`);
  const { data, loading, error } = useGetCurrentUserQuery({
    variables: { userId: Number(currentId[currentId.length - 1]) },
  });
  if (error) {
    return (
      <NotFound>
        <>{translate('title')}</>
        <>{translate('description')}</>
      </NotFound>
    );
  }
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <GoBack />
      <ProfileContainer
        user={data?.getUser.profile ? data.getUser : ({} as User)}
      />
      {children}
    </div>
  );
};

export default ProfileInfo;
