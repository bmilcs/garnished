import { AuthContext } from "@/hooks/useAuthContext";
import { useUserData } from "@/hooks/useUserData";
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
  const { setIsLoggedIn } = useContext(AuthContext);
  const {
    userData,
    isPending: isUserDataPending,
    error: userDataError,
  } = useUserData();
  const [isPending, setIsPending] = useState(false);
  const [updateErrors, setUpdateErrors] = useState<TExpressValidatorError[]>(
    [],
  );
  const [deleteError, setDeleteError] = useState("");
  const [formData, setFormData] = useState<TUser>();
  const navigate = useNavigate();

  // on initial render, retrieve fresh user data from server using useUserData hook.
  // this hook (useUserUpdate) returns useUserData's isPending & error states
  // as well, so we can use those to render a loading spinner or error page.
  useEffect(() => {
    if (!userData) return;
    setFormData(userData);
  }, [userData]);

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
    isUserDataPending,
    userDataError,
    formData,
    setFormData,
    updateUser,
    deleteUser,
    updateErrors,
    deleteError,
    isPending,
  };
};
