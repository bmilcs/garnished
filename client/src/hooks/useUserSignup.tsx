import { AuthContext } from "@/hooks/useAuthContext";
import { TExpressValidatorError } from "@/types/apiResponseTypes";
import { TUserSignup } from "@/types/userTypes";
import { logEvent } from "@/utils/analytics";
import { apiService } from "@/utils/apiService";
import { getErrorMessage } from "@/utils/errors";
import { MOCK_USER } from "@/utils/mockData";
import { useContext, useEffect, useState } from "react";

type TSignupResponse = {
  msg: string;
  authenticated?: boolean;
  errors?: TExpressValidatorError[];
};

// this hook is used by Signup page. it provides state variables for form data,
// pending status, error messages, and a function to submit the form

export const useUserSignup = () => {
  const { redirectAuthorizedUser, setIsLoggedIn, isProduction } =
    useContext(AuthContext);
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<TExpressValidatorError[]>([]);
  const [formData, setFormData] = useState<TUserSignup>(
    isProduction ? ({} as TUserSignup) : MOCK_USER,
  );

  // redirect user to dashboard when the user is logged in

  useEffect(() => {
    redirectAuthorizedUser();
  }, [redirectAuthorizedUser]);

  // signup user on server

  const signup = async () => {
    setErrors([]);
    setIsPending(true);
    // prevent api call if passwords don't match
    // for consistency, all errors are in express-validator format
    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => [
        ...prev,
        {
          type: "error",
          value: "Passwords do not match.",
          msg: "Passwords do not match.",
          path: "password",
          location: "body",
        },
      ]);
      return;
    }
    try {
      const {
        data: { authenticated, errors },
      } = await apiService<TSignupResponse>({
        method: "POST",
        path: `user/signup`,
        body: formData,
      });
      // successful signup
      if (authenticated) {
        setIsLoggedIn(true);
        logEvent({
          category: "user",
          action: "signup",
          label: "success",
        });
        return;
      }
      // api validation errors
      if (errors) {
        setErrors(errors);
        logEvent({
          category: "user",
          action: "signup",
          label: "validation error",
        });
        return;
      }
      // server error
      throw new Error(
        "Server Error: No validation errors or authenticated status returned from API.",
      );
    } catch (e) {
      // other errors
      const error = getErrorMessage(e);
      logEvent({
        category: "user",
        action: "signup",
        label: error,
      });
    } finally {
      setIsPending(false);
    }
  };

  return { formData, setFormData, signup, errors, isPending };
};
