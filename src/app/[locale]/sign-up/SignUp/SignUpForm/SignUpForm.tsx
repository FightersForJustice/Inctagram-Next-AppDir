"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { StatusCode, usePostAuthorizationMutation } from "../../../../../api/auth.api";
import { SignUpFormSchema } from "../../../../../features/schemas/SignUpFormSchema";
import { Loader } from "../../../../../components/Loader/Loader";
import { EmailSentModal } from "./EmailSentModal";
import { FormItem } from "./FormItem";
import { AgreeCheckbox } from "./AgreeCheckbox";

type Props = {
  lang: "en" | "ru";
  translate: (value: string) => ReactNode ;
};

export const SignUpForm: React.FC<Props> = ({ lang, translate }) => {


  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm({
    resolver: yupResolver(SignUpFormSchema()),
    mode: "onTouched",
    
  });

  




  const [showPass, setShowPass] = useState(true);
  const [showConfirmPass, setShowConfirmPass] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [postAuthorization, { isSuccess, isLoading }] = usePostAuthorizationMutation();

  //==изменения== для открытия модалки при успешной регистрации
  useEffect(() => {
    if (isSuccess) setShowModal(true);
  }, [isSuccess]);

  const translateError=(err:string)=> {
    switch (err) {
      case "User with this name is already exist":
        return String(translate('nameExist') )
      case "User with this email is already exist":
        return String(translate('emailExist') )
      default:
        break;
    }
    }

  const onSubmit = (data: SubmitProps) => {

    //==изменения== закидываем данные нового пользоваеля в запрос
    postAuthorization({ userName: data.name, email: data.email, password: data.password })
      .unwrap()
      .then(() => {})
      .catch((err) => {
        if (err.data.statusCode === StatusCode.badRequest) { 
          setError(err.data.messages[0]?.field, { message: translateError(err.data.messages[0]?.message) });
        }
      });

    //==изменения== тут раньше был setShowModal(true), но теперь он в useEffect
    setUserEmail(data.email);

    localStorage.setItem("user-email", data.email);
  };



  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={" mt-[24px] mb-10 pb-[24px]"}>
        <FormItem
          marginTop={"mt-7"}
          translate={translate}
          register={register}
          error={errors.name}
          errorMessage={errors?.name?.message}
          registerName={"name"}
          translateName={"name"}
          id={"sign-up-userName"}

        />

        <FormItem
          marginTop={" mt-[18px]"}
          translate={translate}
          register={register}
          error={errors.email}
          errorMessage={errors?.email?.message}
          registerName={"email"}
          translateName={"email"}
          id={"sign-up-email"}
        />

        <FormItem
          marginTop={" mt-[18px]"}
          translate={translate}
          register={register}
          error={errors.password}
          errorMessage={errors?.password?.message}
          registerName={"password"}
          translateName={"password"}
          id={"sign-up-password"}
          show={showPass}
          setShow={setShowPass}
          showPasswordIcon={true}
        />

        <FormItem
          marginTop={" mt-[18px]"}
          marginBottom={"mb-[18px]"}
          translate={translate}
          register={register}
          error={errors.passwordConfirm}
          errorMessage={errors?.passwordConfirm?.message}
          registerName={"passwordConfirm"}
          translateName={"passwordConf"}
          id={"sign-up-passwordConfirm"}
          show={showConfirmPass}
          setShow={setShowConfirmPass}
          showPasswordIcon={true}
        />

        <AgreeCheckbox 
        translate={translate}
        register={register}
        error={errors.agreements}
        errorMessage={errors?.agreements?.message}
        registerName={"agreements"}
        id={"sign-up-agreemets"}
        />

        <input
          type="submit"
          className={"mb-[18px] bg-[--primary-500] w-[90%] pt-[6px] pb-[6px] cursor-pointer disabled:bg-[--primary-100] disabled:text-gray-300 disabled:cursor-not-allowed "}
          id={"sign-up-submit"}
          value={String(translate("btnName"))}
          disabled={!isValid}
        />
        <p className={"pb-5"}>{translate("question")}</p>
        <Link href={"/sign-in"} className={"text-[--primary-500]"} id={"sign-up-link-to-sign-in"}>
          {translate("btnBottomName")}
        </Link>
      </form>
      {showModal && <EmailSentModal translate={String(translate("sentEmailConfirm"))} userEmail={userEmail} setShowModal={setShowModal} />}
      {isLoading && <Loader />}
    </>
  );
};

type SubmitProps = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};
