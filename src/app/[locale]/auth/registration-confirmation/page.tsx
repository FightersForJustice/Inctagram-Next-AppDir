"use client";

import Confirm from "./Confirm";
import { useTranslations } from "next-intl";

const RegistrationConfirmation = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { code: string };
}) => {
  const t = useTranslations("RegistrationConfirmationPage");

  return <Confirm code={String(searchParams.code)} translate={t} />;
};

export default RegistrationConfirmation;
