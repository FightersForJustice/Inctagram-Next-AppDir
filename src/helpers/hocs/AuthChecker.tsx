import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { appActions } from "@/redux/reducers/appReducer";
import { useGetAuthMeQuery } from "@/api/auth.api";
import { useAppSelector } from "@/redux/hooks/useSelect";
import { useAppDispatch } from "@/redux/hooks/useDispatch";

interface AuthCheckerProps {
  children: React.ReactNode;
}

export const AuthChecker: React.FC<AuthCheckerProps> = ({ children }) => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const [render, setRender] = useState(false);

  const { data, isSuccess, refetch } = useGetAuthMeQuery();
  const { setUserData: setUserData } = appActions;
  const tokenIsActive = useAppSelector((state) => state.app.tokenIsActive);

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
      dispatch(setUserData({ userID: data.userId, email: data.email, userName: data.userName }));
      setRender(true);
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
