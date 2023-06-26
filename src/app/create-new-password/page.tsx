"use client";

import React from "react";
import CreateNewPasswordForm from "./CreateNewPasswordForm/CreateNewPasswordForm";

const CreateNewPassword = () => {
  return (
    <div className={"bg-[#171717] rounded-md m-auto mt-[24px] max-w-[378px] text-center"}>
      <p className={"pt-[23px]"}>Create New Password</p>
      <div className={"flex gap-[60px] justify-center mt-[13px]"}></div>
      <CreateNewPasswordForm />
    </div>
  );
};

export default CreateNewPassword;
