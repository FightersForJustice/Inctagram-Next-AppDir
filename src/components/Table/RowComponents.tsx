import { dateToFormat } from '@/utils/dateToFormat';
import { PaymentType, ResultUserPaymentsType, UsersListType, UsersPaymentType } from './rowTypes';
import { Dots } from '../admin/usersList/Dots';
import Image from 'next/image';
import Link from 'next/link';
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
export const PaymentListRow = ({ el }: { el: UsersPaymentType }) => {
  return (
    <>
      <Image
        src={
          el.avatars?.length
            ? (el.avatars[0].url as string)
            : '/img/create-post/no-image.png'
        }
        alt={'ava'}
        width={36}
        height={36}
        className={s.post__comment__avatar}
      />
      <div className={s.post__comment__date}>{el.userName}</div>
      <div>{dateToFormat(el.createdAt)}</div>
      <div className={s.post__comment__amount}>{el.price} $</div>
      <div>{1}</div>
      <div>{el.paymentMethod}</div>
    </>
  );
};
export const PaymentListByUserRow = ({ el }: { el: ResultUserPaymentsType }) => {
  return (
    <>
      <div>{dateToFormat(el.startDate)}</div>
      <div className={s.post__comment__start_date}>{dateToFormat(el.endDate)}</div>
      <div className={s.post__comment__amount_user}>{el.price} $</div>
      <div>{1}</div>
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
  setShowAreYouSureModal?: (value: boolean) => void;
  setEditUser?: (value: string) => void;
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
                setVisiblePopupId(el.id.toString());
                setShowAreYouSureModal && setShowAreYouSureModal(true);
                setEditUser && setEditUser('unban');
              }}
            />
          ) : null}
        </span>
        {el.id}
      </div>
      <div>{el.userName}</div>
      <div className={s.link}>
        <Link
          href={'/admin/profile/photos/' + el.id}
          style={{ textDecoration: 'underline' }}
        >
          {el.profile.userName}
        </Link>
      </div>
      <div>{dateToFormat(el.createdAt)}</div>
      <div className={s.more_btn}>
        <Dots
          setEditUser={setEditUser ? setEditUser : () => {}}
          id={el.id.toString()}
          setVisiblePopup={setVisiblePopup}
          setVisiblePopupId={setVisiblePopupId}
          visiblePopupId={visiblePopupId}
          visiblePopup={visiblePopup}
          setShowAreYouSureModal={
            setShowAreYouSureModal ? setShowAreYouSureModal : () => {}
          }
        />
      </div>
    </>
  );
};
