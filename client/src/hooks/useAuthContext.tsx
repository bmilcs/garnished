import { getApiEndpoint } from "@/utils/apiConfig";
import { FC, createContext, useEffect, useState } from "react";

//
// Authentication Context
//

type TAuthContextValue = {
  isLoggedIn: boolean;
  error: string;
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  // on first site load, call api to check if user is logged in
  // and set login status accordingly (no user personal data is stored locally)
  useEffect(() => {
    const setAuthStatus = async () => {
      // clear previous errors
      setError("");

      const apiBasePath = getApiEndpoint();
      const url = `${apiBasePath}/api/user/auth-status`;
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
    setAuthStatus().catch(() => setIsLoggedIn(false));
  }, []);

  //
  // login function
  //

  const login = async (formData: { username: string; password: string }) => {
    // clear previous errors
    setError("");

    const apiBasePath = getApiEndpoint();
    const url = `${apiBasePath}/api/user/login`;
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
    }
  };

  //
  // logout function
  //

  const logout = async () => {
    // clear previous errors
    setError("");

    const apiBasePath = getApiEndpoint();
    const url = `${apiBasePath}/api/user/logout`;

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
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, login, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
