"use client";

import React from "react";
import { SignUp } from "./SignUp/SignUp";

const SignUpPage = ({ params }: { params: { locale: "en" | "ru" } }) => {
  return (
    <div>
      <SignUp lang={params.locale} />
    </div>
  );
};

export default SignUpPage;
