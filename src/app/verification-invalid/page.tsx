import React from "react";
import Image from "next/image";

const VerificationInvalid = () => {
  return (
    <div className={"flex flex-col justify-center items-center mt-[24px] mb-9"}>
      <h1 className={"text-[20px] mb-[19px]"}>Email verification link invalid</h1>
      <p className={"max-w-[300px] text-center mb-[30px]"}>
        Looks like the verification link has expired. Not to worry, we can send the link again
      </p>
      <button className={"text-[--light-100] bg-[--primary-500] pt-[6px] pr-[34px] pb-[6px] pl-[34px] mb-[31px]"}>
        Resend link
      </button>
      <Image src={"/img/verification.svg"} alt={"verification"} width={473} height={352} />
    </div>
  );
};

export default VerificationInvalid;
