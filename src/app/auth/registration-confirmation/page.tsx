"use client";

import Confirm from "./Confirm";

const RegistrationConfirmation = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { code: string };
}) => {
  return <Confirm code={String(searchParams.code)} />;
};

export default RegistrationConfirmation;
