import React from "react";
import s from "../MyProfile.module.scss";
import Image from "next/image";
import { Modal } from "../../../../components/Modal/Modal";

type Props = {
  setShowUnsubscribeModal: (value: boolean) => void;
};

export const UnsubscribeModal: React.FC<Props> = ({ setShowUnsubscribeModal }) => {
  return (
    <Modal title={"Unsubscribe"} isOkBtn={false} width={"378px"} onClose={() => setShowUnsubscribeModal(false)}>
      <div className={s.deleteModal}>
        <div className={s.deleteModal__info}>
          <Image
            src={"/img/modal/avatar.png"}
            alt={"avatar"}
            width={36}
            height={36}
            className={s.deleteModal__avatar}
          />
          <p className={s.deleteModal__text}>
            Do you really want to unsubscribe from this user <span>“URLProfiele”</span>?
          </p>
        </div>
        <div className={s.deleteModal__wrapper}>
          <button className={s.deleteModal__btn__yes}>Yes</button>
          <button className={s.deleteModal__btn__no} onClick={() => setShowUnsubscribeModal(false)}>
            No
          </button>
        </div>
      </div>
    </Modal>
  );
};
