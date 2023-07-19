import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { usePostPasswordRecoveryMutation } from "../../../../api/auth.api";
import { Modal } from "../../../../components/Modals/Modal/Modal";
import { Loader } from "../../../../components/Loader/Loader";

type Props = {
  translate: (value: string) => ReactNode;
};

const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

const ForgotPasswordForm: React.FC<Props> = ({ translate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [showModal, setShowModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [recaptcha, setRecaptcha] = useState("");
  const [sendLinkAgain, setSendLinkAgain] = useState(false);

  const [recoveryPassword, { isSuccess, isLoading }] = usePostPasswordRecoveryMutation();

  useEffect(() => {
    if (isSuccess) {
      setShowModal(true);
      setSendLinkAgain(true);
    }
  }, [isSuccess]);

  const onSubmit = (data: any) => {
    recoveryPassword({
      email: data.email,
      recaptcha,
    });
    setUserEmail(data.email);
  };

  const reCaptchaHandler = (token: string | null) => {
    setRecaptcha(token!);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={" mt-[24px] mb-10 pb-[24px]"}>
        <div className={" mt-[18px]"}>
          <div className={" text-left ml-5 text-[--light-900] text-[14px] font-extrabold"}>
            <label>{translate("email")}</label>
          </div>
          <div className={"relative"}>
            <input
              {...register("email")}
              className={`relative bg-transparent border-1 pt-[5px] pl-[12px] pb-[5px] pr-[12px] outline-none rounded-md border-[--dark-100] text-[--light-900] w-[90%] mb-[15px] ${
                errors.email ? "border-red-700" : ""
              }`}
            />
            {errors.email && (
              <p className={"absolute left-[20px] top-[35px] text-[--danger-500] text-[11px]"}>
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <p className={"max-w-[90%] text-left ml-5 text-[--light-900] leading-[20px] mb-[20px]"}>{translate("desc")}</p>

        {sendLinkAgain && (
          <p className={"max-w-[90%] text-left ml-5 text-[--light-300] leading-[20px] mb-[20px] text-[15px]"}>
            {translate("descAfterSend")}
          </p>
        )}

        <input
          type="submit"
          className={`mb-[24px]  w-[90%] pt-[6px] pb-[6px]  ${
            !recaptcha ? "cursor-not-allowed bg-[--disabled] text-[--disabled]" : "cursor-pointer bg-[--primary-500]"
          }`}
          value={`${sendLinkAgain ? `${translate("btnNameAfterSend")}` : `${translate("btnName")}`}`}
          disabled={!recaptcha}
        />

        <Link href={"/sign-in"} className={"text-[--primary-500] block mb-[30px]"}>
          {translate("linkName")}
        </Link>

        <ReCAPTCHA
          sitekey="6LeY2y0mAAAAANwI_paCWfoksCgBm1n2z9J0nwNQ"
          onChange={reCaptchaHandler}
          className={"flex justify-center items-center"}
        />
      </form>
      {showModal && (
        <Modal title={"Email sent"} onClose={() => setShowModal(false)} isOkBtn={true}>
          {translate("modal")} <span className={"text-blue-300"}>{userEmail}</span>
        </Modal>
      )}
      {isLoading && <Loader />}
    </>
  );
};

export default ForgotPasswordForm;
