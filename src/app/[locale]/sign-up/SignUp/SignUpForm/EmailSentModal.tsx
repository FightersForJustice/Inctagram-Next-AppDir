import React from "react";
import { Modal } from "../../../../../components/Modals/Modal/Modal";

type Props = {
  userEmail: string;
  setShowModal: (value: boolean) => void;
};

export const EmailSentModal: React.FC<Props> = ({ userEmail, setShowModal }) => {
  return (
    <Modal title={"Email sent"} onClose={() => setShowModal(false)} isOkBtn={true}>
      We have sent a link to confirm your email to{" "}
      <span id={"sign-up-modalSuccess-userEmail"} className={"text-blue-300"}>
        {userEmail}
      </span>
    </Modal>
  );
};
