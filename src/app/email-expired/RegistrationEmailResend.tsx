import React, { useEffect, useState } from "react";
import { usePostRegistrationEmailResendingMutation } from "../../api/auth.api";
import Image from "next/image";
import { Modal } from "../../components/Modal/Modal";

const RegistrationEmailResend = () => {
  const [showModal, setShowModal] = useState(false);
  const [resend, res] = usePostRegistrationEmailResendingMutation();
  const [userEmail, setUserEmail] = useState("");
  //const userEmail = localStorage.getItem("user-email");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserEmail(localStorage.getItem("user-email")!);
    }
    if (res.isSuccess) setShowModal(true);
  }, [res.isSuccess]);

  const onResend = () => {
    resend({ email: userEmail! });
  };

  return (
    <>
      <div className={"flex flex-col justify-center items-center mt-[24px] mb-9"}>
        <h1 className={"text-[20px] mb-[19px]"}>Email verification link expired</h1>
        <p className={"max-w-[300px] text-center mb-[30px]"}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </p>
        <button
          className={"bg-[--primary-500] rounded-s pt-[6px] pr-[34px] pb-[6px] pl-[34px] mb-[32px]"}
          onClick={onResend}
        >
          Resend verification link
        </button>
        <Image src={"/img/expired.svg"} alt={"congrats"} width={423} height={292} />
      </div>
      {showModal && (
        <Modal title={"Email sent"} onClose={() => setShowModal(false)}>
          We have sent a link to confirm your email to <span className={"text-blue-300"}>{userEmail}</span>
        </Modal>
      )}
    </>
  );
};

export default RegistrationEmailResend;
