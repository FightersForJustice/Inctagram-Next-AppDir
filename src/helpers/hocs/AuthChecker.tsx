import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetAuthMeQuery } from "api/auth.api";
import { UserID, appActions } from "../../redux/reducers/appReducer";
import { useDispatch } from "react-redux";

interface AuthCheckerProps {
  children: React.ReactNode;
}

const AuthChecker: React.FC<AuthCheckerProps> = ({ children }) => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const dispatch = useDispatch();

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


    if (isSuccess) {
      dispatch( setUserID({ userID: data.userId }));
    }

  if (accessToken && isSuccess) {
    return <>{children}</>;
  } else {
    return null; // Другой компонент для отображения или null
  }
};

export default AuthChecker;
