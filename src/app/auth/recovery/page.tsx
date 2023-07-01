"use client";

import React, { useEffect } from "react";
import CreateNewPasswordForm from "./CreateNewPasswordForm/CreateNewPasswordForm";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";

const CreateNewPassword = ({ params, searchParams }: { params: { slug: string }; searchParams: { code: string } }) => {
  useEffect(() => {
    sessionStorage.setItem("userEmailRecoveryCode", searchParams.code);
  }, []);

  return (
    <Provider store={store}>
      <div className={"bg-[#171717] rounded-md m-auto mt-[24px] max-w-[378px] text-center"}>
        <p className={"pt-[23px]"}>Create New Password</p>
        <div className={"flex gap-[60px] justify-center mt-[13px]"}></div>
        <CreateNewPasswordForm />
      </div>
    </Provider>
  );
};

export default CreateNewPassword;