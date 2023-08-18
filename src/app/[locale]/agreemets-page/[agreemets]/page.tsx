"use client";
import { useTranslations } from "next-intl";
import { Agreemets } from "./Agreemets";

type Props = {
  params: {
    agreemets: "privacy-policy" | "terms-of-service";
  };
};



const AgreemetsPage = (props: Props) => {
  const t = useTranslations("AgreemetsPage");

  if (props.params.agreemets === "privacy-policy") {
    return <Agreemets text={t("PrivacyPolicy.text")} title={t("PrivacyPolicy.title")} btnName={t("btnName")}/>;
  }
  if (props.params.agreemets === "terms-of-service") {
    return <Agreemets text={t("TermsOfService.text")} title={t("TermsOfService.title")} btnName={t("btnName")} />;
  }
};

export default AgreemetsPage;
