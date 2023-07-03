import React, { ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { StatusCode, usePostLoginMutation } from "../../../../api/auth.api";

type Props = {
  translate: (value: string) => ReactNode;
};

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(20).required(),
  })
  .required();

const SignIn: React.FC<Props> = ({ translate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [showPass, setShowPass] = useState(false);
  const [postLogin, res] = usePostLoginMutation();

  const onSubmit = async (data: any) => {
    //получение токена при успешной логинизации и запись его в сешнСторедж
    /*try {
      const response: { data: { accessToken: string } } | any = await postLogin({
        email: data.email,
        password: data.password,
      });
      if (response.data.accessToken) sessionStorage.setItem("accessToken", response.data.accessToken);
    } catch (err) {
      console.log(err);
    }*/
    postLogin({
      email: data.email,
      password: data.password,
    })
      .unwrap()
      .then((response) => {
        if (response.accessToken) sessionStorage.setItem("accessToken", response.accessToken);
      })
      .catch((err) => {
        if (err.data.statusCode === StatusCode.badRequest) {
          setError("password", { message: err.data.messages });
          setError("email", { message: "" });
        } else if (err.data.statusCode === StatusCode.unauthorized) {
          setError("password", { message: err.data.messages[0]?.message });
          setError("email", { message: "" });
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={" mt-[24px] mb-10 pb-[24px]"}>
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
          />
          {errors.email && (
            <p className={"absolute left-[5%] text-[--danger-500] text-[14px]"}>{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className={" mt-[18px] mb-[48px]"}>
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
          />
          {showPass ? (
            <Image
              src={"/img/hidePass.svg"}
              alt={"hidePass"}
              width={30}
              height={30}
              className={"absolute top-[3px] right-[24px] cursor-pointer"}
              onClick={() => setShowPass(!showPass)}
            />
          ) : (
            <Image
              src={"/img/showPass.svg"}
              alt={"showPass"}
              width={30}
              height={30}
              className={"absolute top-[3px] right-[24px] cursor-pointer"}
              onClick={() => setShowPass(!showPass)}
            />
          )}
          {errors.password && (
            <p className={"absolute left-[5%] text-[--danger-500] text-[14px]"}>{errors.password.message}</p>
          )}
        </div>
      </div>

      <Link href={"/forgot-password"} className={"flex justify-end mr-[20px] text-[--light-900]"}>
        {translate("forgotPass")}
      </Link>

      <input
        type="submit"
        className={"mb-[18px] bg-[--primary-500] w-[90%] pt-[6px] pb-[6px] cursor-pointer mt-[24px]"}
        value={String(translate("btnName"))}
      />
      <p className={"pb-5"}>{translate("question")}</p>
      <Link href={"/sign-up"} className={"text-[--primary-500]"}>
        {translate("btnBottomName")}
      </Link>
    </form>
  );
};

export default SignIn;
