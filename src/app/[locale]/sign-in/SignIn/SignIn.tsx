import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StatusCode, usePostLoginMutation } from "@/api/auth.api";
import { SignInSchema } from "@/features/schemas/SignInSchema";
import { redirect } from "next/navigation";
import { Loader } from "@/components/Loader/Loader";
import { FormItem } from "../../sign-up/SignUp/SignUpForm/FormItem";
import { toast } from "react-toastify";

type Props = {
  translate: (value: string) => ReactNode;
};

const SignIn: React.FC<Props> = ({ translate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm({
    resolver: yupResolver(SignInSchema()),
    mode: "onTouched",
  });
  const [showPass, setShowPass] = useState(true);
  const [postLogin, { isSuccess, isLoading }] = usePostLoginMutation();

  const onSubmit = (data: any) => {
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
          setError("password", { message: String(translate("error400")) });
          setError("email", { message: String(translate("error400")) });
        } else if (err?.data?.statusCode === StatusCode.unauthorized) {
          // setError("password", { message: err.data.messages[0]?.message });
          setError("email", { message: String(translate("error401")) });
        } else {
          toast.error(err.error);
        }
      });
  };

  if (isSuccess) {
    redirect("/my-profile");
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={" mt-[24px] mb-10 pb-[24px]"}>
        <FormItem
          marginTop={" mt-[18px]"}
          translate={translate}
          register={register}
          error={errors.email}
          errorMessage={errors?.email?.message}
          registerName={"email"}
          translateName={"email"}
          id={"sign-in-email-input"}
        />
        <FormItem
          marginTop={" mt-[18px] "}
          marginBottom={"mb-[48px]"}
          translate={translate}
          register={register}
          error={errors.password}
          errorMessage={errors?.password?.message}
          registerName={"password"}
          translateName={"password"}
          id={"sign-in-password-input"}
          showPasswordIcon={true}
          show={showPass}
          setShow={setShowPass}
        />
        <Link
          href={"/forgot-password"}
          className={"flex justify-end mr-[20px] text-[--light-900]"}
          id={"sign-in-link-forgot-password"}
        >
          {translate("forgotPass")}
        </Link>

        <input
          type="submit"
          className={
            "mb-[18px] bg-[--primary-500] w-[90%] pt-[6px] pb-[6px] cursor-pointer mt-[24px] disabled:bg-[--primary-100] disabled:text-gray-300 disabled:cursor-not-allowed  "
          }
          value={String(translate("btnName"))}
          id={"sign-in-submit"}
          disabled={!isValid}
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
