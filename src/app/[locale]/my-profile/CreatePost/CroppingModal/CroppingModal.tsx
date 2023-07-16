import React, { PropsWithChildren } from "react";
import Image from "next/image";
import "./CroppingModal.css";

type Props = {
  title: string;
  onClose?: () => void;
  width?: string;
};

export const CroppingModal: React.FC<PropsWithChildren<Props>> = ({ onClose, title, children, width }) => {
  return (
    <div className={"modal"} onClick={onClose}>
      <div className={"modal__content"} style={{ width }} onClick={(e) => e.stopPropagation()}>
        <div className={"modal__header"}>
          <Image
            src={"/img/create-post/arrow-back.svg"}
            alt={"arrow-back"}
            width={24}
            height={24}
            className={"modal__arrow"}
          />
          <div className={"modal__title"}>{title}</div>
          <button className={"modal__next"}>Next</button>
        </div>
        <div className={"modal__body"}>{children}</div>
      </div>
    </div>
  );
};
