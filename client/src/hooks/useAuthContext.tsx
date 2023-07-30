import { getApiEndpoint } from "@/utils/apiConfig";
import { FC, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//
// Authentication Context
//

type TAuthContextValue = {
  isLoggedIn: boolean;
  isAuthPending: boolean;
  error: string;
  redirectUnauthorizedUser: () => void;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  login: (formData: TLoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
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

  // on first site load, call api to check if user is logged in
  // and set login status accordingly (no user personal data is stored locally)
  useEffect(() => {
    const setAuthStatus = async () => {
      // clear previous errors
      setError("");

      const apiBasePath = getApiEndpoint();
      const url = `${apiBasePath}/user/auth-status`;
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const { authenticated } = (await res.json()) as TAuthStatusResponse;

        if (authenticated) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch {
        // no error message state is set here because this is a silent check
        console.error("Unable to verify login status. Try again later.");
      }
    };

    setAuthStatus()
      .catch(() => setIsLoggedIn(false))
      .finally(() => setIsAuthPending(false));
  }, []);

  //
  // auto redirect to login page if user is not logged in.
  // without the isAuthPending check, authorized users will get redirected regardless
  // of auth status because the auth status check is async
  //

  const redirectUnauthorizedUser = () => {
    if (isAuthPending) return;
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
  };

  //
  // login function
  //

  const login = async (formData: { username: string; password: string }) => {
    setIsAuthPending(true);
    // clear previous errors
    setError("");

    const apiBasePath = getApiEndpoint();
    const url = `${apiBasePath}/user/login`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const { authenticated, msg } = (await res.json()) as TLoginApiResponse;

      // login successful
      if (authenticated) {
        setIsLoggedIn(true);
        return;
      }

      // login failed, set error message
      setError(msg);
      setIsLoggedIn(false);
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
    // clear previous errors
    setError("");

    const apiBasePath = getApiEndpoint();
    const url = `${apiBasePath}/user/logout`;

    try {
      await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      // logout was successful
      setIsLoggedIn(false);
    } catch {
      setError("Something went wrong. Try again later.");
    } finally {
      setIsAuthPending(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isAuthPending,
        setIsLoggedIn,
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
