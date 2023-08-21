import { AuthContext } from "@/hooks/useAuthContext";
import { TUser } from "@/types/userTypes";
import { apiService } from "@/utils/apiService";
import { useContext, useEffect, useState } from "react";

export type TUserApiResponse = {
  msg: string;
  user: TUser;
};

export const useUserData = () => {
  const { redirectUnauthorizedUser } = useContext(AuthContext);
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

        if (user) setUserData(user);
      } catch {
        setError("Something went wrong while logging in. Try again later.");
      } finally {
        setIsPending(false);
      }
    };

    void getUserData();
  }, [redirectUnauthorizedUser]);

  return { userData, isPending, error };
};
