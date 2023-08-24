import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetAuthMeQuery } from "api/auth.api";
import { appActions } from "../../redux/reducers/appReducer";
import { useDispatch } from "react-redux";

interface AuthCheckerProps {
  children: React.ReactNode;
}

const AuthChecker: React.FC<AuthCheckerProps> = ({ children }) => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [render, setRender] = useState(false)

  const { data, isSuccess } = useGetAuthMeQuery();
  const { setUserID } = appActions;

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
      dispatch(setUserID({ userID: data.userId }));
      setRender(true)
    }
  },[isSuccess]);



  if (render && accessToken) {
  // if (accessToken) {

    return <>{children}</>;
  } else {
    return null; // Другой компонент для отображения или null
  }
};

export default AuthChecker;
