"use client";

import Image from "next/image";
import Link from "next/link";
import Confirm from "./Confirm";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";

const RegistrationConfirmation = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <Provider store={store}>
      <div className={"flex flex-col justify-center items-center mt-[24px] mb-9"}>
        <Confirm code={String(searchParams.code)} />
        <h1 className={"text-[20px] mb-[19px]"}>Congratulations!</h1>
        <p className={"max-w-[300px] text-center mb-[54px]"}>Your email has been confirmed</p>
        <Link
          href={"/sign-in"}
          className={"bg-[--primary-500] rounded-s pt-[6px] pr-[34px] pb-[6px] pl-[34px] mb-[72px]"}
        >
          Sing In
        </Link>
        <Image src={"/img/congrats.svg"} alt={"congrats"} width={423} height={292} />
      </div>
    </Provider>
  );
};

export default RegistrationConfirmation;
