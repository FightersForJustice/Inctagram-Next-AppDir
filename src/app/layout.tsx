"use client";
import "./globals.css";
import React, { ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { store } from "@/redux";
import { Provider } from "react-redux";

export default function RootLayout({ children, params }: { children: ReactNode; params: { lang: string } }) {
  return (
    <html lang={params.lang}>
      <body>
        <Provider store={store}>
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
            {children}
          </GoogleOAuthProvider>
        </Provider>
      </body>
    </html>
  );
}
