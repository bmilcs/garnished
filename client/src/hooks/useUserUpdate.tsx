import { AuthContext } from "@/hooks/useAuthContext";
import { TUserApiResponse } from "@/hooks/useUserData";
import { TExpressValidatorError } from "@/types/apiResponseTypes";
import { TUser } from "@/types/userTypes";
import { apiService } from "@/utils/apiService";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type TUpdateUserResponse = {
  msg: string;
  updated?: boolean;
  errors?: TExpressValidatorError[];
};

type TDeleteResponse = {
  msg: string;
  deleted?: boolean;
};

// user update utilizes an array of express-validator errors, so
// moving this to authContext would require refactoring.
// for now, this custom hook will be the solution.

export const useUserUpdate = () => {
  const { redirectUnauthorizedUser, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [updateErrors, setUpdateErrors] = useState<TExpressValidatorError[]>(
    [],
  );
  const [deleteError, setDeleteError] = useState("");
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
    setUpdateErrors([]);
    setIsPending(true);

    try {
      const {
        data: { updated, errors },
      } = await apiService<TUpdateUserResponse>({
        method: "PATCH",
        path: `user`,
        body: formData,
      });

      if (updated) {
        navigate("/user");
        return;
      }

      if (errors) {
        setUpdateErrors(errors);
      }
    } catch {
      console.error("Something went wrong. Try again later.");
    } finally {
      setIsPending(false);
    }
  };

  const deleteUser = async () => {
    setDeleteError("");
    setIsPending(true);

    try {
      const {
        data: { deleted, msg },
      } = await apiService<TDeleteResponse>({
        method: "DELETE",
        path: `user`,
      });

      if (deleted) {
        navigate("/");
        // the server logs user out & clears cookies upon deletion. this toggles
        // user dashboard visibility, and shows get started elements instead.
        setIsLoggedIn(false);
        return;
      }

      if (msg) {
        setDeleteError(msg);
      }
    } catch {
      console.error("Something went wrong. Try again later.");
    } finally {
      setIsPending(false);
    }
  };

  return {
    formData,
    setFormData,
    updateUser,
    deleteUser,
    updateErrors,
    deleteError,
    isPending,
  };
};
