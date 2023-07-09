"use client";

import React, { ChangeEvent, useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { usePathname } from "next-intl/client";

export const Header = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("LocaleSwitcher");

  const [language, setLanguage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLanguage(localStorage.getItem("language")!);
    }
  }, []);

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    setLanguage(event.currentTarget.value);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", event.currentTarget.value);
    }
    startTransition(() => {
      router.replace(`/${event.target.value}${pathname}`);
    });
  }

  return (
    <header className={"border-b-1 bg-[--dark-700] border-[--dark-300] "}>
      <div className={" max-w-[1200px] m-auto h-[60px] flex items-center justify-between"}>
        <Link href={"/my-profile"} className={"text-[26px] font-semibold leading-[36px]"}>
          Inctagram
        </Link>
        {/*<LocaleSwitcher />*/}
        <select
          name="Languages"
          className={
            "bg-transparent flex justify-center items-center gap-2 border-1 border-[--dark-100] pt-[6px] pb-[6px] pl-[24px] pr-[24px] outline-none cursor-pointer"
          }
          onChange={onSelectChange}
          value={language}
        >
          {/*{["en", "ru"].map((cur) => (
            <option key={cur} value={cur}>
              {t("locale", { locale: cur })}
            </option>
          ))}*/}
          <option value="en" className={"bg-black"}>
            English
          </option>
          <option value="ru" className={"bg-black"}>
            {/*<Image src={"/img/russia.svg"} alt={"russia"} width={20} height={20} />*/}
            Russian
          </option>
        </select>
      </div>
    </header>
  );
};
