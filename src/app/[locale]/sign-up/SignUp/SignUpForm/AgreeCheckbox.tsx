import { RichTranslationValues } from "next-intl";
import Link from "next/link";
import { ReactNode } from "react";


type Props = {
  // translate: {
  //   rich: <TargetKey extends string>(key: TargetKey, values?: RichTranslationValues | undefined) => ReactNode;
  // };
// ----------------- поставил any что бы не тянуть rich с самого начала, надо пофиксить
  translate: any
};

const linkStyle = "text-blue-500 underline hover:text-blue-700 hover:no-underline";

export const AgreeCheckbox: React.FC<Props> = ({ translate }) => {

  return (
    <div className={" mb-[18px] pt-[6px] pb-[6px] cursor-pointer flex justify-center  "}>
      <label className={"max-w-[86%]"}>
        <div className={"text-[12px] flex justify-center  items-start"}>
          <input type="checkbox" className={"mr-2 accent-white w-[20px] mt-[2px] "} />

            <p>
              {translate.rich("agreemetsCheckText", {
                link: (chunks:string) => (
                  <Link className={linkStyle} href="./terms-of-service">
                    {chunks}
                  </Link>
                ),
                link2: (chunks:string) => (
                  <Link className={linkStyle} href="./privacy-policy">
                    {chunks}
                  </Link>
                ),
              })}
            </p>

        </div>
      </label>
    </div>
  );
};
