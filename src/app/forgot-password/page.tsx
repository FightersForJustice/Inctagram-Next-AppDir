"use client";

import React from "react";
import ForgotPasswordForm from "./ForgotPasswordForm/ForgotPasswordForm";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

const ForgotPassword = () => {
  return (
    <Provider store={store}>
      <div className={"bg-[#171717] rounded-md m-auto mt-[24px] max-w-[378px] text-center"}>
        <p className={"pt-[23px]"}>Forgot Password</p>
        <div className={"flex gap-[60px] justify-center mt-[13px]"}></div>
        <ForgotPasswordForm />
      </div>
    </Provider>
  );
};

export default ForgotPassword;
