import React, { PropsWithChildren } from "react";
import Image from "next/image";

import "./FiltersModal.css";

type Props = {
  title: string;
  onClose?: () => void;
  width?: string;
  buttonName: string;
  showSecondModal?: () => void;
  showFourthModal?: () => void;
  showThirdModal?: () => void;
};

export const FiltersModal: React.FC<PropsWithChildren<Props>> = ({
  onClose,
  title,
  width,
  children,
  buttonName,
  showSecondModal,
  showFourthModal,
  showThirdModal,
}) => {
  return (
    <div className={"modal"} onClick={onClose}>
      <div className={"modal__content1"} style={{ width }} onClick={(e) => e.stopPropagation()}>
        <div className={"modal__header"}>
          <Image
            src={"/img/create-post/arrow-back.svg"}
            alt={"arrow-back"}
            width={24}
            height={24}
            className={"modal__arrow"}
            onClick={() => (buttonName === "Publish" ? showThirdModal() : showSecondModal())}
          />
          <div className={"modal__title"}>{title}</div>
          <button className={"modal__next"} onClick={() => (showFourthModal ? showFourthModal() : showThirdModal()!)}>
            {buttonName}
          </button>
        </div>
        <div className={"modal__body1"}>{children}</div>
      </div>
    </div>
  );
};
