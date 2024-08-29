import { MyPaymentsTab } from '@/components/ProfileSettings/Tabs/MyPaymentsTab/MyPaymentsTab';
import { PaymentsType } from '../../types';
import { getPayments } from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/actions';

const MyPayments = async () => {
  const subscriptionsData: Array<PaymentsType> = await getPayments();
  return <MyPaymentsTab data={subscriptionsData} />;
};

export default MyPayments;
