import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthCheckerProps {
  children: React.ReactNode;
}

const AuthChecker: React.FC<AuthCheckerProps> = ({ children }) => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);

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

  if (accessToken) {
    return <>{children}</>;
  } else {
    return null; // Другой компонент для отображения или null
  }
};

export default AuthChecker;
