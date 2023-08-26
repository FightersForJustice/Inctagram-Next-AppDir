"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { CreateNewPasswordForm } from "./CreateNewPasswordForm";

const CreateNewPassword = ({ params, searchParams }: { params: { slug: string }; searchParams: { code: string } }) => {
  const t = useTranslations("RecoveryPage");

  const parameters = useSearchParams();

  useEffect(() => {
    sessionStorage.setItem("userEmailRecoveryCode", parameters.get("code")!);
  }, []);

  return (
    <div className={"bg-[#171717] rounded-md m-auto mt-[100px] max-w-[378px] text-center"}>
      <p className={"pt-[23px]"}>{t("title")}</p>
      <div className={"flex gap-[60px] justify-center mt-[13px]"}></div>
      <CreateNewPasswordForm translate={t} />
    </div>
  );
};

export default CreateNewPassword;
