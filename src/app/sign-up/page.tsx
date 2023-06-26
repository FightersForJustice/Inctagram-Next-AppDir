"use client";

import React from "react";
import { SignUp } from "../../components/SignUp/SignUp";
import { store } from "redux/store";
import { Provider } from "react-redux";
import { SignUp } from "./SignUp/SignUp";

const SignUpPage = () => {
  return (
    <Provider store={store}>
      <div>
        <SignUp />
      </div>
    </Provider>
  );
};

export default SignUpPage;
