"use client";

import React from "react";
import Image from "next/image";
import SignIn from "./SignIn/SignIn";
import { useTranslations } from "next-intl";
import { Loader } from "../../../components/Loader/Loader";
import { usePostLoginMutation } from "../../../api/auth.api";
import { redirect } from "next/navigation";

const SignInPage = () => {
  const t = useTranslations("SignInPage");

  const [postLogin, { isSuccess, isLoading }] = usePostLoginMutation();

  if (isSuccess) redirect("/my-profile");

  if (isLoading) {
    return (
      <div className={"flex justify-center items-center h-[30vh]"}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={"bg-[#171717] rounded-md m-auto mt-[36px] max-w-[378px] text-center"}>
      <p className={"pt-[23px]"}>{t("title")}</p>
      <div className={"flex gap-[60px] justify-center mt-[13px]"}>
        <Image src={"/img/google.svg"} alt={"google-icon"} width={36} height={36} />
        <Image src={"/img/github.svg"} alt={"github-icon"} width={36} height={36} />
      </div>
      <SignIn postLogin={postLogin} translate={t} />
    </div>
  );
};

export default SignInPage;
