"use client";

import { useTranslations } from "next-intl";
import { Confirm } from "./Confirm";

const RegistrationConfirmation = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { code: string };
}) => {
  const t = useTranslations("RegistrationConfirmationPage");
  console.log(`${searchParams.code} CONFIRM-CODE` + `| ${params} - PARAMSprops`);
  return <Confirm code={String(searchParams.code)} translate={t} />;
};

export default RegistrationConfirmation;
