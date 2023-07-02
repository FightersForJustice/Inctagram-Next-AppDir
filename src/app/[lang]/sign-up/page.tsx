"use client";

import React from "react";
import { SignUp } from "./SignUp/SignUp";

const SignUpPage = ({ params }: { params: { lang: "en" | "ru" } }) => {
  return (
    <div>
      <SignUp lang={params.lang} />
    </div>
  );
};

export default SignUpPage;
