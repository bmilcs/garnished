import { apiService } from "@/utils/apiService";
import { clientMode } from "@/utils/clientMode";
import { FC, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//
// Authentication Context
//

type TAuthContextValue = {
  isLoggedIn: boolean;
  isAuthPending: boolean;
  error: string;
  redirectAuthorizedUser: () => void;
  redirectUnauthorizedUser: () => void;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  login: (credentials: TLoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  isProduction: boolean;
};

export const AuthContext = createContext<TAuthContextValue>(
  {} as TAuthContextValue,
);

//
// Authentication Provider
//

type TAuthStatusResponse = {
  authenticated: boolean;
};

type TLoginCredentials = {
  username: string;
  password: string;
};

type TLoginApiResponse = {
  msg: string;
  authenticated: boolean;
};

type TProps = {
  children: React.ReactNode;
};

export const AuthProvider: FC<TProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthPending, setIsAuthPending] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState("");
  const isProduction = clientMode() === "production";

  // on first site load, call api to check if user is logged in
  // and set login status accordingly (no user personal data is stored locally)
  useEffect(() => {
    const setAuthStatus = async () => {
      setIsAuthPending(true);
      setError("");

      try {
        const {
          data: { authenticated },
        } = await apiService<TAuthStatusResponse>({
          path: "user/auth-status",
          method: "GET",
        });

        setIsLoggedIn(authenticated);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setIsAuthPending(false);
      }
    };

    void setAuthStatus();
  }, []);

  //
  // login function
  //

  const login = async (loginCredentials: TLoginCredentials) => {
    setIsAuthPending(true);
    setIsLoggedIn(false);
    setError("");

    try {
      const {
        data: { authenticated, msg },
      } = await apiService<TLoginApiResponse>({
        method: "POST",
        path: "user/login",
        body: loginCredentials,
      });

      if (authenticated) {
        setIsLoggedIn(true);
        return;
      }

      // login failed, set error message from server
      setError(msg);
    } catch {
      setError("Something went wrong. Try again later.");
    } finally {
      setIsAuthPending(false);
    }
  };

  //
  // logout function
  //

  const logout = async () => {
    setIsAuthPending(true);
    setError("");

    try {
      const { status } = await apiService({
        method: "DELETE",
        path: "user/logout",
      });

      if (status === 200) {
        setIsLoggedIn(false);
        navigate("/");
        return;
      }

      throw new Error();
    } catch {
      setError("Something went wrong. Try again later.");
    } finally {
      setIsAuthPending(false);
    }
  };

  //
  // redirects to a given path if user is not logged in
  // without the isAuthPending check, authorized users will get redirected regardless
  // of auth status because the auth status check is async & takes time to complete
  //

  const redirectUnauthorizedUser = (path = "/login") => {
    if (isAuthPending) return;
    if (!isLoggedIn) {
      navigate(path);
      return;
    }
  };

  //
  // redirect user if authorized
  //

  const redirectAuthorizedUser = (path = "/user") => {
    if (isAuthPending) return;
    if (isLoggedIn) {
      navigate(path);
      return;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isProduction,
        isLoggedIn,
        isAuthPending,
        setIsLoggedIn,
        redirectAuthorizedUser,
        redirectUnauthorizedUser,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
