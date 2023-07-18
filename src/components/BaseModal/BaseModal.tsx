import "../Modal/Modal.css";
import React, { ReactNode } from "react";
import Image from "next/image";

export const BaseModal = ({
  children,
  title,
  onClose,
  isOkBtn,
}: {
  children: ReactNode;
  title: string;
  onClose: () => void;
  isOkBtn: boolean;
}) => {
  return (
    <div className={"modal"}>
      <div className={"modal__content"}>
        <div className={"modal__header"}>
          <div className={"modal__title"}>{title}</div>
          <Image
            className={"modal__close"}
            src={"/img/close.svg"}
            alt={"close"}
            width={24}
            height={24}
            onClick={onClose}
          />
        </div>
        <div className={"modal__body"}>{children}</div>
        {isOkBtn && (
          <div className={"modal__footer"}>
            <button className={"modal__btn"} onClick={onClose}>
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
