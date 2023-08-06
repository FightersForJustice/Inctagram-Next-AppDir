import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ReCAPTCHA from "react-google-recaptcha";
import { usePostPasswordRecoveryMutation } from "../../../../api/auth.api";
import { Modal } from "../../../../components/Modals/Modal/Modal";
import { Loader } from "../../../../components/Loader/Loader";
import { ForgotPasswordSchema } from "../../../../features/schemas/ForgotPasswordFormSchema";
import { EmailForm } from "./EmailForm/EmailForm";

type Props = {
  translate: (value: string) => ReactNode;
};

const ForgotPasswordForm: React.FC<Props> = ({ translate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(ForgotPasswordSchema()),
    mode: "onTouched"
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
        <EmailForm
          translate={translate}
          register={register}
          error={errors.email}
          errorMessage={errors?.email?.message}
        />

        <p className={"max-w-[90%] text-left ml-5 text-[--light-900] leading-[20px] mb-[20px]"}>{translate("desc")}</p>

        {sendLinkAgain && (
          <p className={"max-w-[90%] text-left ml-5 text-[--light-300] leading-[20px] mb-[20px] text-[15px]"}>
            {translate("descAfterSend")}
          </p>
        )}

        <input
          type="submit"
          className={"mb-[24px]  w-[90%] pt-[6px] pb-[6px]   bg-[--primary-500] w-[90%] pt-[6px] pb-[6px] cursor-pointer mt-[24px] disabled:bg-[--primary-100] disabled:text-gray-300 disabled:cursor-not-allowed  "}
          value={`${sendLinkAgain ? `${translate("btnNameAfterSend")}` : `${translate("btnName")}`}`}
          disabled={!recaptcha || !isValid}
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
