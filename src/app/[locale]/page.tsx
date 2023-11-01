"use client";

import { redirect } from "next/navigation";

export default function IndexPage() {
  redirect("/my-profile");
}
