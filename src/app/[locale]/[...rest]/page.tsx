"use client";

import { useTranslations } from "next-intl";
import NotFound from "@/components/NotFound/NotFound";

export default function CatchAllPage() {
  const t = useTranslations("NotFoundPage");

  return (
    <NotFound>
      <>{t("title")}</>
      <>{t("description")}</>
    </NotFound>
  );
}
