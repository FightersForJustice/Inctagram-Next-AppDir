import { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';

import s from './BaseModal.module.scss';

export const BaseModal = ({
  children,
  title,
  titleBtn,
  onClose,
  onAction,
  isOkBtn,
  paymentStatus,
}: {
  children: ReactNode;
  title: string;
  titleBtn: string;
  onClose: () => void;
  onAction: () => void;
  isOkBtn: boolean;
  paymentStatus: boolean;
}) => {
  const [status, setStatus] = useState(paymentStatus)
  useEffect(()=>{
    if (paymentStatus) {
      setStatus(paymentStatus)
    }

  },[paymentStatus])
  return (
    <div className={s.modal}>
      <div className={s.modal__content}>
        <div className={s.modal__header}>
          <div className={s.modal__title}>{title}</div>
          <Image
            className={s.modal__close}
            src={'/img/close.svg'}
            alt={'close'}
            width={24}
            height={24}
            onClick={onClose}
          />
        </div>
        <div className={s.modal__body}>{children}</div>
        {isOkBtn && (
          <div className={s.baseMmodal__footer}>
            <button className={s.baseMmodal__btn} onClick={onAction}>
              {status ? 'OK' : titleBtn}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
