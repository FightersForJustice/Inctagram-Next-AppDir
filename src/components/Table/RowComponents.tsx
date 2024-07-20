import { dateToFormat } from '@/utils/dateToFormat';
import { PaymentType, UsersListType } from './rowTypes';
import Image from 'next/image';
import Link from 'next/link';
import { Dots } from '../admin/usersList/Dots';
import s from './MyPayments.module.scss';

export const PaymentRow = ({ el }: { el: PaymentType }) => {
  return (
    <>
      <div>{dateToFormat(el.dateOfPayment)}</div>
      <div>{dateToFormat(el.endDateOfSubscription)}</div>
      <div>${el.price}</div>
      <div>{el.subscriptionType}</div>
      <div>{el.paymentType}</div>
    </>
  );
};
export const UsersListRow = ({
  el,
  setEditUser,
  setVisiblePopup,
  setVisiblePopupId,
  visiblePopup,
  visiblePopupId,
  setShowAreYouSureModal,
}: {
  el: UsersListType;
  setVisiblePopup: (value: boolean) => void;
  visiblePopup: boolean;
  setVisiblePopupId: (value: string) => void;
  visiblePopupId: string;
  setShowAreYouSureModal: (value: boolean) => void;
  setEditUser: (value: string) => void;
}) => {
  return (
    <>
      <div className={s.userList}>
        <span>
          {el.userBan ? (
            <Image
              src={'/img/Block.svg'}
              alt={''}
              width={25}
              height={25}
              className={s.icon}
              onClick={() => {
                setVisiblePopupId(el.id.toString())
                setShowAreYouSureModal(true);
                setEditUser('unban')
              }}
            />
          ) : null}
        </span>
        {el.id}
      </div>
      <div>{el.userName}</div>
      <div className={s.link}>
        <Link
          href={'/admin/profile/' + el.id}
          style={{ textDecoration: 'underline' }}
        >
          {el.profile.userName}
        </Link>
      </div>
      <div>{dateToFormat(el.createdAt)}</div>
      <div className={s.more_btn}>
        <Dots
          setEditUser={setEditUser}
          id={el.id.toString()}
          setVisiblePopup={setVisiblePopup}
          setVisiblePopupId={setVisiblePopupId}
          visiblePopupId={visiblePopupId}
          visiblePopup={visiblePopup}
          setShowAreYouSureModal={setShowAreYouSureModal}
        />
      </div>
    </>
  );
};
