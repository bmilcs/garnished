import { AuthContext } from "@/hooks/useAuthContext";
import { TUser } from "@/types/userTypes";
import { logEvent } from "@/utils/analytics";
import { apiService } from "@/utils/apiService";
import { getErrorMessage } from "@/utils/errors";
import { formatPhoneNumber } from "@/utils/formatters";
import { useContext, useEffect, useState } from "react";

export type TUserApiResponse = {
  msg: string;
  user: TUser;
};

// this hook is used by User & UserUpdate page. it fetches user data from server, and provides
// state variables for user data, pending status, and error messages.

export const useUserData = () => {
  const { redirectUnauthorizedUser, setIsLoggedIn } = useContext(AuthContext);
  const [isPending, setIsPending] = useState(true);
  const [userData, setUserData] = useState<TUser | null>(null);
  const [error, setError] = useState("");

  // on initial render, retrieve user data from server

  useEffect(() => {
    redirectUnauthorizedUser();

    const getUserData = async () => {
      setIsPending(true);
      setError("");
      try {
        const {
          data: { user },
        } = await apiService<TUserApiResponse>({
          path: "user",
        });
        // successful retrieval
        if (user) {
          const formattedUser = {
            ...user,
            phone: formatPhoneNumber(user.phone),
          };
          setUserData(formattedUser);
          return;
        }
        // if no user data is found, the server clears jwt cookies & logs the user out.
        // update the GUI accordingly by setting isLoggedIn to false (in the catch block),
        // hiding user dashboard access.
        throw new Error(
          "Server error: No user data found. You have been logged out",
        );
      } catch (e) {
        // all errors
        const error = getErrorMessage(e);
        setError(error);
        setIsLoggedIn(false);
        logEvent({
          category: "user",
          action: "get user data",
          label: error,
        });
      } finally {
        setIsPending(false);
      }
    };

    void getUserData();
  }, [redirectUnauthorizedUser, setIsLoggedIn]);

  return { userData, isPending, error };
};
