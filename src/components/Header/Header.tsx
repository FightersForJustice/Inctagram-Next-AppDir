"use client";

import React, { ChangeEvent, useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next-intl/client";
import { HeaderNotification } from "./HeaderNotification/HeaderNotification";
import { Loader } from "@/components/Loader/Loader";

function hasQueryParams(inputString: string): boolean {
  const queryParamsRegex = /\?.+=.+$/;
  return queryParamsRegex.test(inputString);
}

export const Header = () => {
  // const [language, setLanguage] = useState<string>("ru");
  const [language, setLanguage] = useState<string>("");

  const [isPending, startTransition] = useTransition();
  const [loggedId, setLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", "en");
      setLanguage("en");
      router.replace(`/${localStorage.getItem("language")}/${pathname}`);
    } else {
      setLanguage(localStorage.getItem("language")!);
      router.replace(`/${localStorage.getItem("language")}/${pathname}`);
    }
    if (sessionStorage.getItem("accessToken")) {
      setLoggedIn(true);
    }
  }
  }, []);

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.currentTarget.value);

    // if (typeof window !== "undefined") {
    localStorage.setItem("language", event.currentTarget.value);
    // }
    startTransition(() => {
      router.replace(`/${event.target.value}${pathname}`);
    });
  };

  return (
    <header className={"border-b-1 bg-[--dark-700] border-[--dark-300] fixed w-[100%] z-10 "}>
      <div className={" max-w-[1200px] m-auto h-[60px] flex items-center justify-between px-3"}>
        <Link href={"/my-profile"} className={"text-[26px] font-semibold leading-[36px]"}>
          Inctagram
        </Link>

        <div className={"flex justify-center items-center gap-[54px]"}>
          {loggedId && <HeaderNotification />}

          {!language ? (
            <div>
              <Loader />
            </div>
          ) : (
            <select
              name="Languages"
              className={`bg-transparent flex justify-center items-center gap-2 border-1 border-[--dark-100] pt-[6px] pb-[6px] pl-[24px] pr-[24px] outline-none cursor-pointer`}
              onChange={onSelectChange}
              value={language}
            >
              <option value="en" className={`bg-black`}>
                English
              </option>
              <option value="ru" className={`bg-black`}>
                Russian
              </option>
            </select>
          )}
        </div>
      </div>
    </header>
  );
};

//из селекта
{
  /*{["en", "ru"].map((cur) => (
            <option key={cur} value={cur}>
              {t("locale", { locale: cur })}
            </option>
          ))}*/
}
{
  /*<Image src={"/img/russia.svg"} alt={"russia"} width={20} height={20} />*/
}
