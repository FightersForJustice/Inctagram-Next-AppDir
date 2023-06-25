import React from "react";
import Image from "next/image";

const EmailExpired = () => {
  return (
    <div>
      <div className={"flex flex-col justify-center items-center mt-[24px] mb-9"}>
        <h1 className={"text-[20px] mb-[19px]"}>Email verification link expired</h1>
        <p className={"max-w-[300px] text-center mb-[30px]"}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </p>
        <button className={"bg-[--primary-500] rounded-s pt-[6px] pr-[34px] pb-[6px] pl-[34px] mb-[32px]"}>
          Resend verification link
        </button>
        <Image src={"/img/expired.svg"} alt={"congrats"} width={423} height={292} />
      </div>
    </div>
  );
};

export default EmailExpired;
