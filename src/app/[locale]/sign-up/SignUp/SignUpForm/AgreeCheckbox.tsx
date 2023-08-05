import { RichTranslationValues } from "next-intl";
import Link from "next/link";
import { ReactNode } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { InputError } from "./InputError";

type Props = {
  // translate: {
  //   rich: <TargetKey extends string>(key: TargetKey, values?: RichTranslationValues | undefined) => ReactNode;
  // };
  // ----------------- поставил any что бы не тянуть rich с самого начала, надо пофиксить
  translate: any;

  register: UseFormRegister<any>;
  error: FieldError | undefined;
  errorMessage: string | undefined;
  registerName: string;
  id: string;
};

const linkStyle = "text-blue-500 underline hover:text-blue-700 hover:no-underline";




export const AgreeCheckbox: React.FC<Props> = ({ translate, register, error, errorMessage, registerName, id }) => {

  return (
    <div className={" mb-[18px] pt-[6px] pb-[6px] cursor-pointer flex justify-center  "}>
      <label className={"relative"}>
        <div className={`text-[12px] pr-[30px] pl-[30px] flex justify-center  items-start`}>
          <input 
          type="checkbox" 
          className={`mr-2 accent-white w-[20px] mt-[2px] `} 
          {...register(registerName)} 
          id={id}
     
          />

          <p >
            {translate.rich("agreemetsCheckText", {
              link: (chunks: string) => (
                <Link className={linkStyle} href="./terms-of-service">
                  {chunks}
                </Link>
              ),
              link2: (chunks: string) => (
                <Link className={linkStyle} href="./privacy-policy">
                  {chunks}
                </Link>
              ),
            })}


          </p>

        </div>



          <InputError error={error} errorMessage={errorMessage} id={"sign-up-userName-error"} className={"left-[30%]"} />        

      </label>
    </div>
  );
};
