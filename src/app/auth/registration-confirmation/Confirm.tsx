import React, { useEffect } from "react";
import { usePostRegistrationConfirmationMutation } from "../../../api/auth.api";

type Props = {
  code: string;
};

const Confirm: React.FC<Props> = ({ code }) => {
  const [registrationConfirm] = usePostRegistrationConfirmationMutation();
  console.log(code);
  useEffect(() => {
    registrationConfirm({ confirmationCode: String(code) });
  }, [code, registrationConfirm]);

  return <div></div>;
};

export default Confirm;
