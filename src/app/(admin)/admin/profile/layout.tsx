import ProfileInfo from '@/components/layouts/ProfileInfoLayout/profile-info';
import ProfileTabs from '@/components/Tabs/Tabs';

type Props = {
  children: React.ReactNode;
};

export default async function UserProfile({ children }: Props) {
  return (
    <ProfileInfo>
      <ProfileTabs />
      {children}
    </ProfileInfo>
  );
}
