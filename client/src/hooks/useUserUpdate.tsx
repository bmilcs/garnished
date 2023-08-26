import { AuthContext } from "@/hooks/useAuthContext";
import { TUserApiResponse } from "@/hooks/useUserData";
import { TExpressValidatorError } from "@/types/apiResponseTypes";
import { TUser } from "@/types/userTypes";
import { apiService } from "@/utils/apiService";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type TSignupResponse = {
  msg: string;
  updated?: boolean;
  errors?: TExpressValidatorError[];
};

type TDeleteResponse = {
  msg: string;
  deleted?: boolean;
};

// signup utilizes an array of express-validator errors, so
// moving this to authContext would require refactoring.
// for now, this custom hook will be the solution.

export const useUserUpdate = () => {
  const { redirectUnauthorizedUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<TExpressValidatorError[]>([]);
  const [formData, setFormData] = useState<TUser>();

  useEffect(() => {
    const getUserData = async () => {
      setIsPending(true);

      try {
        const {
          data: { user },
        } = await apiService<TUserApiResponse>({
          path: "user",
        });

        if (user) setFormData(user);
      } catch {
        console.error(
          "Something went wrong while logging in. Try again later.",
        );
      } finally {
        setIsPending(false);
      }
    };

    redirectUnauthorizedUser();
    void getUserData();
  }, [redirectUnauthorizedUser]);

  const updateUser = async () => {
    setErrors([]);
    setIsPending(true);

    try {
      const {
        data: { updated, errors },
      } = await apiService<TSignupResponse>({
        method: "PATCH",
        path: `user`,
        body: formData,
      });

      if (updated) {
        navigate("/user");
      } else if (errors) {
        setErrors(errors);
      }
    } catch {
      console.error("Something went wrong. Try again later.");
    } finally {
      setIsPending(false);
    }
  };

  const deleteUser = async () => {
    setErrors([]);
    setIsPending(true);

    try {
      const {
        data: { deleted },
      } = await apiService<TDeleteResponse>({
        method: "DELETE",
        path: `user`,
      });

      if (deleted) {
        await logout();
        navigate("/");
      } else if (errors) {
        setErrors(errors);
      }
    } catch {
      console.error("Something went wrong. Try again later.");
    } finally {
      setIsPending(false);
    }
  };

  return { formData, setFormData, updateUser, deleteUser, errors, isPending };
};
