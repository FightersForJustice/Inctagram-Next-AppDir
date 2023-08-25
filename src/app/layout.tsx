"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { ReduxProvider } from "@/components/ReduxProvider/ReduxProvier";
import { ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({ subsets: ["latin"] });

const googleClientId = "617342613759-f3kbvgm8l310fn40vh6qna2pv8u2uccr.apps.googleusercontent.com";

export default function RootLayout({ children, params }: { children: ReactNode; params: { lang: string } }) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <ReduxProvider>
          <GoogleOAuthProvider clientId={googleClientId}>{children}</GoogleOAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
