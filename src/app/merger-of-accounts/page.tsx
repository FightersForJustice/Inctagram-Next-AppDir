import React from "react";
import Image from "next/image";

const MergerOfAccounts = () => {
  return (
    <div className={"flex flex-col justify-center items-center mt-[24px] mb-9"}>
      <h1 className={"text-[20px] mb-[19px]"}>Merger of Accounts</h1>
      <p className={"max-w-[300px] text-center mb-[30px]"}>
        The user with email <span className={"text-blue-500"}>Epam@epam.com</span> is already in the system. Could we
        merge this accounts?
      </p>
      <button
        className={
          "text-[--primary-500] border-1 border-[--primary-500] pt-[6px] pr-[34px] pb-[6px] pl-[34px] mb-[24px]"
        }
      >
        Yes, merge
      </button>
      <button
        className={
          "text-[--primary-500] border-1 border-[--primary-500] pt-[6px] pr-[65px] pb-[6px] pl-[65px] mb-[24px]"
        }
      >
        No
      </button>
      <Image src={"/img/merger.svg"} alt={"merger"} width={423} height={292} />
    </div>
  );
};

export default MergerOfAccounts;
