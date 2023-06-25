"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import Image from "next/image";
import { Modal } from "../../Modal/Modal";

const schema = yup
  .object({
    username: yup.string().min(3).max(30).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(20).required(),
    passwordConfirm: yup.string().min(6).required(),
  })
  .required();

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const onSubmit = (data: any) => {
    setUserEmail(data.email);
    setShowModal(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={" mt-[24px] mb-10 pb-[24px]"}>
        <div className={" mt-7"}>
          <div className={"text-left ml-5 text-[--light-900] text-[14px]"}>
            <label>Username</label>
          </div>
          <div className={"relative"}>
            <input
              {...register("username")}
              className={` bg-transparent border-1 pt-[5px] pl-[12px] pb-[5px] pr-[12px] outline-none rounded-md border-[--dark-100] text-[--light-900] w-[90%] ${
                errors.username ? "border-red-700" : ""
              }`}
            />
            {errors.username && (
              <p className={"absolute left-[15%] text-[--danger-500] text-[14px]"}>{errors.username.message}</p>
            )}
          </div>
        </div>

        <div className={" mt-[18px]"}>
          <div className={" text-left ml-5 text-[--light-900] text-[14px]"}>
            <label>Email</label>
          </div>
          <div className={"relative"}>
            <input
              {...register("email")}
              className={`relative bg-transparent border-1 pt-[5px] pl-[12px] pb-[5px] pr-[12px] outline-none rounded-md border-[--dark-100] text-[--light-900] w-[90%] ${
                errors.email ? "border-red-700" : ""
              }`}
            />
            {errors.email && (
              <p className={"absolute left-[30%] text-[--danger-500] text-[14px]"}>{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className={" mt-[18px]"}>
          <div className={" text-left ml-5 text-[--light-900] text-[14px]"}>
            <label>Password</label>
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

        <div className={" mt-[18px] mb-[36px]"}>
          <div className={" text-left ml-5 text-[--light-900] text-[14px]"}>
            <label>Confirm password</label>
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
              <p className={"absolute left-[9%] text-[--danger-500] text-[14px]"}>{errors.passwordConfirm.message}</p>
            )}
          </div>
        </div>

        <input
          type="submit"
          className={"mb-[18px] bg-[--primary-500] w-[90%] pt-[6px] pb-[6px] cursor-pointer"}
          value={"Sign Up"}
        />
        <p className={"pb-5"}>Do you have an account?</p>
        <Link href={"/sign-in"} className={"text-[--primary-500]"}>
          Sign In
        </Link>
      </form>
      {showModal && (
        <Modal title={"Email sent"} onClose={() => setShowModal(false)}>
          We have sent a link to confirm your email to <span className={"text-blue-300"}>{userEmail}</span>
        </Modal>
      )}
    </>
  );
};

/*type Submit = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};*/
