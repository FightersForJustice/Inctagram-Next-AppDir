"use client";

import React from "react";
import ForgotPasswordForm from "./ForgotPasswordForm/ForgotPasswordForm";
import { useTranslations } from "next-intl";

const ForgotPassword = () => {
  const t = useTranslations("ForgotPasswordPage");

  return (
    <div className={"bg-[#171717] rounded-md m-auto mt-[24px] max-w-[378px] text-center"}>
      <p className={"pt-[23px]"}>{t("title")}</p>
      <div className={"flex gap-[60px] justify-center mt-[13px]"}></div>
      <ForgotPasswordForm translate={t} />
    </div>
  );
};

export default ForgotPassword;
