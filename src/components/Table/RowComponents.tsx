import { dateToFormat } from '@/utils/dateToFormat';
import { PaymentType, UsersListType } from './rowTypes';
import Image from 'next/image';
import Link from 'next/link';
import s from './MyPayments.module.scss';
import { HeaderMenuMobile } from '../Header/HeaderMenuMobile/HeaderMenuMobile';

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
export const UsersListRow = ({ el }: { el: UsersListType }) => {
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
              // onClick={() => setShow(!show)}
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
        {/* <Image
          src={
            el.id !== el.currentActionId
              ? '/img/more-horizontalBlack.svg'
              : '/img/more-horizotnal.svg'
          }
          alt={''}
          width={25}
          height={25}
          className={s.icon}
          onClick={() => el.moreAction(el.id)}
        /> */}
        { el.id !== el.currentActionId && (
            <HeaderMenuMobile userEmail={''} isAdmin isHeader={false} />)}
      </div>
    </>
  );
};
