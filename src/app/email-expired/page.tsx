"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import RegistrationEmailResend from "./RegistrationEmailResend";

const EmailExpired = () => {
  return (
    <Provider store={store}>
      <RegistrationEmailResend />
    </Provider>
  );
};

export default EmailExpired;
