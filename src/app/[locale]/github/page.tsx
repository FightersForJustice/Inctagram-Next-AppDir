"use client";
import { Loader } from "@/components/Loader";
import { redirect } from "next/navigation";
import { useParamsCustomHook } from "@/utils/useParamsCustomHook";

const GitHub = () => {
  const params = useParamsCustomHook(["accessToken", "email"]);
  sessionStorage.setItem("accessToken", params[0]);
  redirect("/my-profile");
  return <Loader />;
};

export default GitHub;
