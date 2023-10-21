import React, { ChangeEvent, useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next-intl/client";
import { HeaderNotification } from "@/components/Header/HeaderNotification";
import { Loader } from "@/components/Loader/Loader";

function hasQueryParams(inputString: string): boolean {
  const queryParamsRegex = /\?.+=.+$/;
  return queryParamsRegex.test(inputString);
}

export const Header = () => {
  const [language, setLanguage] = useState<string>("ru");
  const [isPending, startTransition] = useTransition();
  const [loggedId, setLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setLanguage(localStorage.getItem("language") || "ru");
  }, []);

  const onSelectChange = ({ currentTarget: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(value);
    localStorage.setItem("language", value);

    startTransition(() => {
      router.replace(`/${value}${pathname}`);
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
