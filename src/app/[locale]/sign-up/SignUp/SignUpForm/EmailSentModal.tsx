import React, { ReactNode } from "react";
import { Modal } from "../../../../../components/Modals/Modal/Modal";

type Props = {
  userEmail: string;
  setShowModal: (value: boolean) => void;
  translate: string
};

export const EmailSentModal: React.FC<Props> = ({ userEmail, setShowModal, translate }) => {
  return (
    <Modal title={"Email sent"} onClose={() => setShowModal(false)} isOkBtn={true}>
     {translate}{" "}
      <span id={"sign-up-modalSuccess-userEmail"} className={"text-blue-300"}>
        {userEmail}
      </span>
    </Modal>
  );
};
