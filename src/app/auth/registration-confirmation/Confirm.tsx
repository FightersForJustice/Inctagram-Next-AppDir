import React, { useEffect } from "react";
import { usePostRegistrationConfirmationMutation } from "../../../api/auth.api";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  code: string;
};

const Confirm: React.FC<Props> = ({ code }) => {
  const [registrationConfirm] = usePostRegistrationConfirmationMutation();
  const router = useRouter();

  useEffect(() => {
    registrationConfirm({ confirmationCode: String(code) })
      .unwrap()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        //if error redirect to email-expired page
        if (err.data.error) {
          router.push("/email-expired");
        }
      });
  }, [code, registrationConfirm]);

  return (
    <div className={"flex flex-col justify-center items-center mt-[24px] mb-9"}>
      <h1 className={"text-[20px] mb-[19px]"}>Congratulations!</h1>
      <p className={"max-w-[300px] text-center mb-[54px]"}>Your email has been confirmed</p>
      <Link
        href={"/sign-in"}
        className={"bg-[--primary-500] rounded-s pt-[6px] pr-[34px] pb-[6px] pl-[34px] mb-[72px]"}
      >
        Sing In
      </Link>
      <Image src={"/img/congrats.svg"} alt={"congrats"} width={423} height={292} />
    </div>
  );
};

export default Confirm;
