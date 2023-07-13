"use client";

import {redirect} from "next/navigation";

export default function IndexPage() {
  redirect("/sign-in");
  return (
    /*<PageLayout title={t("title")}>
      <p className="max-w-[590px]">
        {t.rich("description", {
          p: (chunks) => <p className="mt-4">{chunks}</p>,
          code: (chunks) => <code className="font-mono text-white">{chunks}</code>,
        })}
      </p>
    </PageLayout>*/
    <h1>main page</h1>
  );
}
