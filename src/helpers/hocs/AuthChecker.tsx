import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { appActions } from "@/redux/reducers/appReducer";
import { useDispatch } from "react-redux";
import { useGetAuthMeQuery } from "@/api/auth.api";

interface AuthCheckerProps {
  children: React.ReactNode;
}

const AuthChecker: React.FC<AuthCheckerProps> = ({ children }) => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [render, setRender] = useState(false)

  const { data, isSuccess } = useGetAuthMeQuery();
  const { setUserData: setUserData } = appActions;

  useEffect(() => {
    if (typeof sessionStorage !== "undefined") {
      const storedToken = sessionStorage.getItem("accessToken");
      if (storedToken) {
        setAccessToken(storedToken);
      } else {
        router.replace("/sign-in"); // Перенаправление на страницу входа
      }
    }
  }, [router]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserData({ userID: data.userId, email: data.email }));
      setRender(true)
    }
  }, [isSuccess]);



  if (render && accessToken) {
  // if (accessToken) 
// debugger
    return <>{children}</>;
  } else {
    return null; // Другой компонент для отображения или null
  }
};

export default AuthChecker;
