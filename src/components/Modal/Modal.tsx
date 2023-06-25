import React, { PropsWithChildren } from "react";
import "./Modal.css";
import Image from "next/image";

type Props = {
  title: string;
  onClose?: () => void;
};

export const Modal: React.FC<PropsWithChildren<Props>> = ({ onClose, title, children }) => {
  return (
    <div className={"modal"} onClick={onClose}>
      <div className={"modal__content"} onClick={(e) => e.stopPropagation()}>
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
        <div className={"modal__footer"}>
          <button className={"modal__btn"} onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
