import { AccountManagementTab } from '@/components/ProfileSettings/Tabs/AccountManagementTab/AccountManagementTab';
import { headers } from 'next/headers';
import { SubscriptionsCostType, SubscriptionsType } from '../../types';
import { getSubscriptions, getSubscriptionsCosts } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/actions';

const AccountManagement = async () => {
  const headersList = headers();
  const token = headersList.get('accessToken');
  const subscriptionsData: SubscriptionsType = await getSubscriptions();
  const subscriptionsCostsData: SubscriptionsCostType = await getSubscriptionsCosts();

  return <AccountManagementTab token={token!} data={subscriptionsData} cost={subscriptionsCostsData} />;
};



export default AccountManagement;
