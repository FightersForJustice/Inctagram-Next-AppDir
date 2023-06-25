import React from "react";
import Image from "next/image";
import { SignUpForm } from "./SignUpForm/SignUpForm";

export const SignUp = () => {
  return (
    <div className={"bg-[#171717] rounded-md m-auto mt-[24px] max-w-[378px] text-center"}>
      <p className={"pt-[23px]"}>Sign Up</p>
      <div className={"flex gap-[60px] justify-center mt-[13px]"}>
        <Image src={"/img/google.svg"} alt={"google-icon"} width={36} height={36} />
        <Image src={"/img/github.svg"} alt={"github-icon"} width={36} height={36} />
      </div>
      <SignUpForm />
    </div>
  );
};
