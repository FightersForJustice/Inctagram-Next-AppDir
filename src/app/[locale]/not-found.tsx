"use client";

import NotFound from "components/NotFound/NotFound";
import { BaseLayout } from "components/layouts/BaseLayout/BaseLayout";
import { useTranslations } from "next-intl";

// Note that `app/[locale]/[...rest]/page.tsx`
// is necessary for this page to render.

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");

  return (
    <BaseLayout>
      <NotFound>
        <>{t("title")}</>
        <>{t("description")}</>
      </NotFound>
    </BaseLayout>
  );
}




