import React, { ReactNode, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePostRegistrationConfirmationMutation } from "../../../../api/auth.api";
import { toast } from "react-toastify";
import { Loader } from "../../../../components/Loader/Loader";

type Props = {
  code: string;
  translate: (value: string) => ReactNode;
};

const Confirm: React.FC<Props> = ({ code, translate }) => {
  const [registrationConfirm, { isLoading }] = usePostRegistrationConfirmationMutation();
  const router = useRouter();

  useEffect(() => {
    registrationConfirm({ confirmationCode: String(code) })
      .unwrap()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        toast.error("Error confirmation");
        if (err.data.error) {
          router.push("/email-expired");
        }
      });
  }, [code, registrationConfirm]);

  return (
    <div className={"flex flex-col justify-center items-center mt-[24px] mb-9"}>
      <h1 className={"text-[20px] mb-[19px]"}>{translate("title")}</h1>
      <p className={"max-w-[300px] text-center mb-[54px]"}>{translate("desc")}</p>
      <Link
        href={"/sign-in"}
        className={"bg-[--primary-500] rounded-s pt-[6px] pr-[34px] pb-[6px] pl-[34px] mb-[72px]"}
      >
        {translate("btnName")}
      </Link>
      <Image src={"/img/congrats.svg"} alt={"congrats"} width={423} height={292} />
      {isLoading && <Loader />}
    </div>
  );
};

export default Confirm;