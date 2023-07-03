"use client";

import React from "react";
import RegistrationEmailResend from "./RegistrationEmailResend";
import { useTranslations } from "next-intl";

const EmailExpired = () => {
  const t = useTranslations("EmailExpiredPage");

  return <RegistrationEmailResend translate={t} />;
};

export default EmailExpired;
