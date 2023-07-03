import React, { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";

import { useRouter } from "next/navigation";
import {
  StatusCode,
  usePostNewPasswordMutation,
  usePostPasswordCheckRecoveryCodeMutation,
} from "../../../../../api/auth.api";

const schema = yup
  .object({
    password: yup.string().min(6).max(20).required(),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Password mismatch")
      .min(6)
      .required(),
  })
  .required();

type Props = {
  translate: (value: string) => ReactNode;
};

const CreateNewPasswordForm: React.FC<Props> = ({ translate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isCodeSuccess, setIsCodeSuccess] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState("");
  const router = useRouter();

  console.log(recoveryCode);

  const [postNewPassword, newPasswordResult] = usePostNewPasswordMutation();
  const [checkCode] = usePostPasswordCheckRecoveryCodeMutation();

  useEffect(() => {
    setRecoveryCode(sessionStorage.getItem("userEmailRecoveryCode")!);

    if (recoveryCode) {
      checkCode({ recoveryCode })
        .unwrap()
        .then(() => setIsCodeSuccess(true))
        .catch((err) => {
          if (err.data.statusCode === StatusCode.badRequest) {
            setError("passwordConfirm", { message: err.data.messages[0]?.message });
          }
        });
    }
  }, [recoveryCode]);

  useEffect(() => {
    if (newPasswordResult.isSuccess) {
      router.push("/sign-in");
    }
  }, [newPasswordResult.isSuccess, router]);

  const onSubmit = (data: any) => {
    if (isCodeSuccess) {
      postNewPassword({ newPassword: data.password, recoveryCode });
      sessionStorage.removeItem("userEmailRecoveryCode");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={" mt-[24px] mb-[36px] pb-[24px]"}>
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
            <p className={"absolute left-[16%] text-[--danger-500] text-[14px]"}>{errors.password.message}</p>
          )}
        </div>
      </div>

      <div className={" mt-[18px] mb-[26px]"}>
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
          />
          {showConfirmPass ? (
            <Image
              src={"/img/hidePass.svg"}
              alt={"hidePass"}
              width={30}
              height={30}
              className={"absolute top-[3px] right-[24px] cursor-pointer"}
              onClick={() => setShowConfirmPass(!showConfirmPass)}
            />
          ) : (
            <Image
              src={"/img/showPass.svg"}
              alt={"showPass"}
              width={30}
              height={30}
              className={"absolute top-[3px] right-[24px] cursor-pointer"}
              onClick={() => setShowConfirmPass(!showConfirmPass)}
            />
          )}
          {errors.passwordConfirm && (
            <p className={"absolute left-[5%] text-[--danger-500] text-[14px]"}>{errors.passwordConfirm.message}</p>
          )}
        </div>
      </div>
      <p className={"text-left ml-5 text-[--light-900] leading-5 mb-[40px]"}>{translate("desc")}</p>

      <input
        type="submit"
        className={`mb-[10px]  w-[90%] pt-[6px] pb-[6px] bg-[--primary-500] cursor-pointer`}
        value={String(translate("btnName"))}
      />
    </form>
  );
};

export default CreateNewPasswordForm;
