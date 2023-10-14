import { AuthContext } from "@/hooks/useAuthContext";
import { useUserData } from "@/hooks/useUserData";
import { TExpressValidatorError } from "@/types/apiResponseTypes";
import { TUser } from "@/types/userTypes";
import { logEvent } from "@/utils/analytics";
import { apiService } from "@/utils/apiService";
import { getErrorMessage } from "@/utils/errors";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type TUpdateUserResponse = {
  msg: string;
  updated?: boolean;
  errors?: TExpressValidatorError[];
};

type TDeleteUserResponse = {
  msg: string;
  deleted?: boolean;
};

// this hook is used by UserUpdate page. it fetches fresh user data, and provides
// functions to update or delete user data on server. it also provides state variables
// for form data, pending status, and error messages.

export const useUserUpdate = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  const [formData, setFormData] = useState<TUser>();
  const [isUserActionPending, setIsUserActionPending] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [updateErrors, setUpdateErrors] = useState<TExpressValidatorError[]>(
    [],
  );
  const {
    userData,
    isPending: isUserDataPending,
    error: userDataError,
  } = useUserData();

  // on initial render, retrieve fresh user data from server using useUserData hook.
  // this hook (useUserUpdate) returns useUserData's isUserActionPending & error states
  // as well, so we can use those to render a loading spinner or error page.

  useEffect(() => {
    if (!userData) return;
    setFormData(userData);
  }, [userData]);

  // update user data on server

  const updateUser = async () => {
    setUpdateErrors([]);
    setIsUserActionPending(true);
    try {
      const {
        data: { updated, errors },
      } = await apiService<TUpdateUserResponse>({
        method: "PATCH",
        path: `user`,
        body: formData,
      });
      // successful update
      if (updated) {
        navigate("/user");
        logEvent({
          category: "user",
          action: "update user data",
          label: "success",
        });
        return;
      }
      // api validation errors
      if (errors) {
        setUpdateErrors(errors);
        logEvent({
          category: "user",
          action: "update user data",
          label: "validation error",
        });
        return;
      }
      // server error
      throw new Error(
        "Server Error: No updated status or errors returned from API.",
      );
    } catch (e) {
      const error = getErrorMessage(e);
      logEvent({
        category: "user",
        action: "update user data",
        label: error,
      });
    } finally {
      setIsUserActionPending(false);
    }
  };

  // delete user data on server

  const deleteUser = async () => {
    setDeleteError("");
    setIsUserActionPending(true);
    try {
      const {
        data: { deleted, msg },
      } = await apiService<TDeleteUserResponse>({
        method: "DELETE",
        path: `user`,
      });
      // successful deletion
      if (deleted) {
        // the server logs user out & clears cookies upon deletion. this toggles
        // user dashboard visibility, and shows get started elements instead
        setIsLoggedIn(false);
        navigate("/");
        logEvent({
          category: "user",
          action: "delete user data",
          label: "success",
        });
        return;
      }
      // api validation errors
      if (msg) {
        setDeleteError(msg);
        logEvent({
          category: "user",
          action: "delete user data",
          label: `api error: ${msg}`,
        });
        return;
      }
      // server error
      throw new Error(
        "Server Error: No deleted status or errors returned from API.",
      );
    } catch (e) {
      // other errors
      const error = getErrorMessage(e);
      logEvent({
        category: "user",
        action: "delete user data",
        label: error,
      });
    } finally {
      setIsUserActionPending(false);
    }
  };

  return {
    isUserActionPending,
    isUserDataPending,
    userDataError,
    formData,
    setFormData,
    updateUser,
    deleteUser,
    updateErrors,
    deleteError,
  };
};
