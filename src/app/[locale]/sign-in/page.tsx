"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useGoogleLogin } from "@react-oauth/google";
import { useLoginWithGoogleOAuthMutation } from "@/api";
import { Loader } from "@/components/Loader";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { SignIn } from "./SignIn";

const SignInPage = () => {
  const t = useTranslations("SignInPage");
  const router = useRouter();

  const [loginWithGoogle, { data, isLoading }] = useLoginWithGoogleOAuthMutation();

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      router.push("/my-profile");
    }

    if (data?.accessToken) {
      router.push("/my-profile");

      if (typeof sessionStorage !== "undefined") {
        sessionStorage.setItem("accessToken", data.accessToken);
      }
    }
  }, [data]);

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      loginWithGoogle({ code: codeResponse.code })
        .unwrap()
        .then((res) => {
          toast.success(`Hello, ${res.email}!`);
        })
        .catch((err) => toast.error(err));
    },
    onError: (errorResponse) => toast.error(errorResponse.error),
  });

  return (
    <>
      <div id={"sign-in"} className={"bg-[#171717] rounded-md m-auto max-w-[378px] text-center mt-[100px]"}>
        <p className={"pt-[23px]"}>{t("title")}</p>
        <div className={"flex gap-[60px] justify-center mt-[13px]"}>
          <Image
            onClick={googleLogin}
            className={"cursor-pointer"}
            src={"/img/google.svg"}
            alt={"google-icon"}
            width={36}
            height={36}
          />
          <Image src={"/img/github.svg"} alt={"github-icon"} width={36} height={36} />
        </div>
        <SignIn translate={t} />
      </div>
      {isLoading && <Loader />}
    </>
  );
};

export default SignInPage;
