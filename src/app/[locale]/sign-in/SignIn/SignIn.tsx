import React, { ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StatusCode, usePostLoginMutation } from "../../../../api/auth.api";
import { SignInSchema } from "../../../../features/schemas/SignInSchema";
import { redirect } from "next/navigation";
import { Loader } from "../../../../components/Loader/Loader";

type Props = {
  translate: (value: string) => ReactNode;
};

const SignIn: React.FC<Props> = ({ translate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });
  const [showPass, setShowPass] = useState(false);
  const [postLogin, { isSuccess, isLoading }] = usePostLoginMutation();

  const onSubmit = async (data: any) => {
    postLogin({
      email: data.email,
      password: data.password,
    })
      .unwrap()
      .then((response) => {
        if (response.accessToken) sessionStorage.setItem("accessToken", response.accessToken);
      })
      .catch((err) => {
        if (err?.data?.statusCode === StatusCode.badRequest) {
          setError("password", { message: err.data.messages });
          setError("email", { message: err.data.messages });
        } else if (err?.data?.statusCode === StatusCode.unauthorized) {
          setError("password", { message: err.data.messages[0]?.message });
          setError("email", { message: err.data.messages[0]?.message });
        }
      });
  };

  if (isSuccess) redirect("/my-profile");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={" mt-[24px] mb-10 pb-[24px]"}>
        <div className={" mt-[18px]"}>
          <div className={" text-left ml-5 text-[--light-900] text-[14px]"}>
            <label>{translate("email")}</label>
          </div>
          <div className={"relative"}>
            <input
              id={"sign-in-email-input"}
              {...register("email")}
              className={`relative bg-transparent border-1 pt-[5px] pl-[12px] pb-[5px] pr-[12px] outline-none rounded-md border-[--dark-100] text-[--light-900] w-[90%] ${
                errors.email ? "border-red-700" : ""
              }`}
            />
            {errors.email && (
              <p className={"absolute left-[5%] text-[--danger-500] text-[14px]"} id={"sign-in-errors-email-message"}>
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className={" mt-[18px] mb-[48px]"}>
          <div className={" text-left ml-5 text-[--light-900] text-[14px]"}>
            <label>{translate("password")}</label>
          </div>
          <div className={"relative"}>
            <input
              id={"sign-in-password-input"}
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
              <p
                className={"absolute left-[5%] text-[--danger-500] text-[14px]"}
                id={"sign-in-errors-password-message"}
              >
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <Link
          href={"/forgot-password"}
          className={"flex justify-end mr-[20px] text-[--light-900]"}
          id={"sign-in-link-forgot-password"}
        >
          {translate("forgotPass")}
        </Link>

        <input
          type="submit"
          className={"mb-[18px] bg-[--primary-500] w-[90%] pt-[6px] pb-[6px] cursor-pointer mt-[24px]"}
          value={String(translate("btnName"))}
          id={"sign-in-submit"}
        />
        <p className={"pb-5"}>{translate("question")}</p>
        <Link href={"/sign-up"} className={"text-[--primary-500]"} id={"sign-in-link-sign-up"}>
          {translate("btnBottomName")}
        </Link>
      </form>
      {isLoading && <Loader />}
    </>
  );
};

export default SignIn;
