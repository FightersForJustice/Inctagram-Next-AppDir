"use client";

import NotFound from "components/NotFound/NotFound";
import { BaseLayout } from "components/layouts/BaseLayout/BaseLayout";
// import { useTranslations } from "next-intl";

export default function CatchAllPage() {
  // const t = useTranslations("NotFoundPage");

  return (

      <NotFound>
        {/* <>{t("title")}</>
        <>{t("description")}</> */}
        <div>Hello </div>
        <div>world</div>
      </NotFound>

  );
}
