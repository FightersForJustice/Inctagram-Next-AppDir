"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import Image from "next/image";
import { StatusCode, usePostAuthorizationMutation } from "../../../../../api/auth.api";
import { Modal } from "../../../../../components/Modals/Modal/Modal";
import { SignUpFormSchema } from "../../../../../features/schemas/SignUpFormSchema";
import { Loader } from "../../../../../components/Loader/Loader";

type Props = {
  lang: "en" | "ru";
  translate: (value: string) => ReactNode;
};

export const SignUpForm: React.FC<Props> = ({ lang, translate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(SignUpFormSchema),
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [postAuthorization, { isSuccess, isLoading }] = usePostAuthorizationMutation();

  //==изменения== для открытия модалки при успешной регистрации
  useEffect(() => {
    if (isSuccess) setShowModal(true);
  }, [isSuccess]);

  const onSubmit = (data: SubmitProps) => {
    //==изменения== закидываем данные нового пользоваеля в запрос
    postAuthorization({ userName: data.userName, email: data.email, password: data.password })
      .unwrap()
      .then(() => {})
      .catch((err) => {
        if (err.data.statusCode === StatusCode.badRequest) {
          setError(err.data.messages[0]?.field, { message: err.data.messages[0]?.message });
        }
      });

    //==изменения== тут раньше был setShowModal(true), но теперь он в useEffect
    setUserEmail(data.email);

    localStorage.setItem("user-email", data.email);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={" mt-[24px] mb-10 pb-[24px]"}>
        <div className={" mt-7"}>
          <div className={"text-left ml-5 text-[--light-900] text-[14px]"}>
            <label>{translate("username")}</label>
          </div>
          <div className={"relative"}>
            <input
              {...register("userName")}
              className={` bg-transparent border-1 pt-[5px] pl-[12px] pb-[5px] pr-[12px] outline-none rounded-md border-[--dark-100] text-[--light-900] w-[90%] ${
                errors.userName ? "border-red-700" : ""
              }`}
              id={"sign-up-userName"}
            />
            {errors.userName && (
              <p className={"absolute left-[5%] text-[--danger-500] text-[12px]"} id={"sign-up-userName-error"}>
                {errors.userName.message}
              </p>
            )}
          </div>
        </div>

        <div className={" mt-[18px]"}>
          <div className={" text-left ml-5 text-[--light-900] text-[14px]"}>
            <label>{translate("email")}</label>
          </div>
          <div className={"relative"}>
            <input
              {...register("email")}
              className={`relative bg-transparent border-1 pt-[5px] pl-[12px] pb-[5px] pr-[12px] outline-none rounded-md border-[--dark-100] text-[--light-900] w-[90%] ${
                errors.email ? "border-red-700" : ""
              }`}
              id={"sign-up-email"}
            />
            {errors.email && (
              <p className={"absolute left-[5%] text-[--danger-500] text-[12px]"} id={"sign-up-email-error"}>
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className={" mt-[18px]"}>
          <div className={" text-left ml-5 text-[--light-900] text-[14px]"}>
            <label>{translate("password")}</label>
          </div>
          <div className={"relative"}>
            <input
              {...register("password")}
              type={`${showPass ? "text" : "password"}`}
              className={`relative bg-transparent border-1 pt-[5px] pl-[12px] pb-[5px] pr-[12px] outline-none rounded-md border-[--dark-100] text-[--light-900] w-[90%] ${
                errors.password ? "border-red-700" : ""
              }`}
              id={"sign-up-password"}
            />
            {showPass ? (
              <Image
                src={"/img/hidePass.svg"}
                alt={"hidePass"}
                width={30}
                height={30}
                className={"absolute top-[3px] right-[24px] cursor-pointer"}
                onClick={() => setShowPass(!showPass)}
                id={"sign-up-password-showPassImage-openAye"}
              />
            ) : (
              <Image
                src={"/img/showPass.svg"}
                alt={"showPass"}
                width={30}
                height={30}
                className={"absolute top-[3px] right-[24px] cursor-pointer"}
                onClick={() => setShowPass(!showPass)}
                id={"sign-up-password-showPassImage-closeAye"}
              />
            )}
            {errors.password && (
              <p className={"absolute left-[5%] text-[--danger-500] text-[12px]"} id={"sign-up-password-error"}>
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className={" mt-[18px] mb-[36px]"}>
          <div className={" text-left ml-5 text-[--light-900] text-[14px]"}>
            <label>{translate("passwordConf")}</label>
          </div>
          <div className={"relative"}>
            <input
              {...register("passwordConfirm")}
              type={`${showConfirmPass ? "text" : "password"}`}
              className={`relative bg-transparent border-1 pt-[5px] pl-[12px] pb-[5px] pr-[12px] outline-none rounded-md border-[--dark-100] text-[--light-900] w-[90%] ${
                errors.passwordConfirm ? "border-red-700" : ""
              }`}
              id={"sign-up-passwordConfirm"}
            />
            {showConfirmPass ? (
              <Image
                src={"/img/hidePass.svg"}
                alt={"hidePass"}
                width={30}
                height={30}
                className={"absolute top-[3px] right-[24px] cursor-pointer"}
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                id={"sign-up-passwordConfirm-showPassImage-openAye"}
              />
            ) : (
              <Image
                src={"/img/showPass.svg"}
                alt={"showPass"}
                width={30}
                height={30}
                className={"absolute top-[3px] right-[24px] cursor-pointer"}
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                id={"sign-up-passwordConfirm-showPassImage-closeAye"}
              />
            )}
            {errors.passwordConfirm && (
              <p className={"absolute left-[5%] text-[--danger-500] text-[12px]"} id={"sign-up-passwordConfirm-error"}>
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>
        </div>

        <input
          type="submit"
          className={"mb-[18px] bg-[--primary-500] w-[90%] pt-[6px] pb-[6px] cursor-pointer"}
          id={"sign-up-submit"}
          value={String(translate("btnName"))}
        />
        <p className={"pb-5"}>{translate("question")}</p>
        <Link href={"/sign-in"} className={"text-[--primary-500]"} id={"sign-up-link-to-sign-in"}>
          {translate("btnBottomName")}
        </Link>
      </form>
      {showModal && (
        <Modal title={"Email sent"} onClose={() => setShowModal(false)} isOkBtn={true}>
          We have sent a link to confirm your email to{" "}
          <span id={"sign-up-modalSuccess-userEmail"} className={"text-blue-300"}>
            {userEmail}
          </span>
        </Modal>
      )}
      {isLoading && <Loader />}
    </>
  );
};

type SubmitProps = {
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};
