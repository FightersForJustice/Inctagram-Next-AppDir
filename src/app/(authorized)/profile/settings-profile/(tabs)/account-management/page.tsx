import { AccountManagementTab } from '@/components/ProfileSettings/Tabs/AccountManagementTab/AccountManagementTab';
import { headers } from 'next/headers';
import { PaymentsType, SubscriptionsCostType, SubscriptionsType } from '../../types';
import {
  getPayments,
  getSubscriptions,
  getSubscriptionsCosts,
} from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/actions';

const AccountManagement = async () => {
  const headersList = headers();
  const token = headersList.get('accessToken');
  const subscriptionsData: SubscriptionsType = await getSubscriptions();
  const subscriptionsCostsData: SubscriptionsCostType = await getSubscriptionsCosts();
  const paymentsData: Array<PaymentsType> = await getPayments();

  return <AccountManagementTab token={token!} data={subscriptionsData} paymentsData={paymentsData} cost={subscriptionsCostsData} />;
};



export default AccountManagement;
