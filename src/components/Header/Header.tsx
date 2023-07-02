"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export const Header = () => {
  const [language, setLanguage] = useState(
    typeof window !== "undefined" && localStorage.getItem("language") ? localStorage.getItem("language") : "en"
  );

  useEffect(() => {
    typeof window !== "undefined" && localStorage.setItem("language", language!);
  }, [language]);

  return (
    <div className={"border-b-1 bg-[--dark-700] border-[--dark-300] "}>
      <div className={" max-w-[1200px] m-auto h-[60px] flex items-center justify-between"}>
        <Link href={"/"} className={"text-[26px] font-semibold leading-[36px]"}>
          Inctagram
        </Link>
        <select
          name="Languages"
          className={
            "bg-transparent flex justify-center items-center gap-2 border-1 border-[--dark-100] pt-[6px] pb-[6px] pl-[24px] pr-[24px] outline-none cursor-pointer"
          }
          value={language!}
          onChange={(e) => setLanguage(e.currentTarget.value)}
        >
          <option value="en" className={"bg-black"}>
            English
          </option>
          <option value="ru" className={"bg-black"}>
            {/*<Image src={"/img/russia.svg"} alt={"russia"} width={20} height={20} />*/}
            Russian
          </option>
        </select>
      </div>
    </div>
  );
};
