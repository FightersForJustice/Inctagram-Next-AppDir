import { MyPaymentsTab } from '@/components/ProfileSettings/Tabs/MyPaymentsTab/MyPaymentsTab';
import { getPayments } from '../../../[id]/actions';
import { PaymentsType } from '../../types';

const MyPayments = async () => {
  const subscriptionsData: Array<PaymentsType> = await getPayments();
  return <MyPaymentsTab data={subscriptionsData} />;
};

export default MyPayments;
