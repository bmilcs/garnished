import { AuthContext } from "@/hooks/useAuthContext";
import { TUser } from "@/types/userTypes";
import { apiService } from "@/utils/apiService";
import { useContext, useEffect, useState } from "react";

export type TUserApiResponse = {
  msg: string;
  user: TUser;
};

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

        // if no user data is returned, the server clears jwt cookies & logs the user out.
        // update the GUI accordingly by setting isLoggedIn to false, hiding user dashboard access.
        // the user dashboard page will then display the ErrorPage component.
        if (user) setUserData(user);
        else setIsLoggedIn(false);
      } catch {
        setError("Something went wrong while logging in. Try again later.");
        setIsLoggedIn(false);
      } finally {
        setIsPending(false);
      }
    };

    void getUserData();
  }, [redirectUnauthorizedUser, setIsLoggedIn]);

  return { userData, isPending, error };
};
