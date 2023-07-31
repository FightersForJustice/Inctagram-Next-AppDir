"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SignIn from "./SignIn/SignIn";
import { useTranslations } from "next-intl";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwtDecode from "jwt-decode";

const SignInPage = () => {
  const t = useTranslations("SignInPage");
  const [user, setUser] = useState<any>([]);
  const [profile, setProfile] = useState<any>([]);

  console.log(profile);

  /*useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        })
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);*/

  // log out function to log the user out of Google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  const login = useGoogleLogin({
    //onSuccess: (codeResponse) => setUser(codeResponse),
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
    },
    flow: "auth-code",
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <div id={"sign-in"} className={"bg-[#171717] rounded-md m-auto mt-[36px] max-w-[378px] text-center"}>
      <p className={"pt-[23px]"}>{t("title")}</p>
      <div className={"flex gap-[60px] justify-center mt-[13px]"}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(jwtDecode(credentialResponse.credential!));
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          type={"icon"}
          shape={"circle"}
          useOneTap
        />

        {/* <button onClick={() => login()}>Sign in with Google 🚀 </button>*/}

        {/*<Image src={"/img/google.svg"} alt={"google-icon"} width={36} height={36} />*/}
        <Image src={"/img/github.svg"} alt={"github-icon"} width={36} height={36} />
      </div>
      <SignIn translate={t} />
    </div>
  );
};

export default SignInPage;
