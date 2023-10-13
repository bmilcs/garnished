import { logEvent } from "@/utils/analytics";
import { apiService } from "@/utils/apiService";
import { clientMode } from "@/utils/clientMode";
import { getErrorMessage } from "@/utils/errors";
import { FC, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//
// authentication context
//

type TAuthContextValue = {
  isAuthPending: boolean;
  isLoggedIn: boolean;
  isProduction: boolean;
  error: string;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  login: (credentials: TLoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  redirectAuthorizedUser: () => void;
  redirectUnauthorizedUser: () => void;
};

export const AuthContext = createContext<TAuthContextValue>(
  {} as TAuthContextValue,
);

//
// authentication provider
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

// this component provides authentication & isProduction state variables &
// functions to login, logout, and redirect users based on their authentication
// status to all child components via the AuthContext

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

  // login function

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
        logEvent({ action: "login", category: "auth", label: "success" });
        setIsLoggedIn(true);
        return;
      }
      // login failed: set error message from server
      setError(msg);
      logEvent({
        action: "login",
        category: "auth",
        label: msg,
      });
    } catch (e) {
      // other errors
      const error = getErrorMessage(e);
      setError(error);
      logEvent({
        action: "login",
        category: "auth",
        label: error,
      });
    } finally {
      setIsAuthPending(false);
    }
  };

  // logout function

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
        logEvent({
          action: "logout",
          category: "auth",
          label: "success",
        });
        navigate("/");
        return;
      }
      throw new Error("Logout failed due to a server error.");
    } catch (e) {
      const error = getErrorMessage(e);
      setError(error);
      logEvent({
        action: "logout",
        category: "auth",
        label: error,
      });
    } finally {
      setIsAuthPending(false);
    }
  };

  // redirect user to a given path if user is not logged in
  // without the isAuthPending check, authorized users will get redirected regardless
  // of auth status because the auth status check is async & takes time to complete

  const redirectUnauthorizedUser = (path = "/login") => {
    if (isAuthPending) return;
    if (!isLoggedIn) {
      navigate(path);
      return;
    }
  };

  // redirect user to a given path if user is authorized
  // this provides the inverse functionality of the redirectUnauthorizedUser function

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
