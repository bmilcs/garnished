import { AuthContext } from "@/hooks/useAuthContext";
import { TExpressValidatorError } from "@/types/apiResponseTypes";
import { TUserSignup } from "@/types/userTypes";
import { logEvent } from "@/utils/analytics";
import { apiService } from "@/utils/apiService";
import { getErrorMessage } from "@/utils/errors";
import { useContext, useEffect, useState } from "react";

type TSignupResponse = {
  msg: string;
  authenticated?: boolean;
  errors?: TExpressValidatorError[];
};

const dummySignup = {
  firstName: "Reggie",
  lastName: "Miller",
  username: "reggie@miller.com",
  password: "asdfasdf",
  confirmPassword: "asdfasdf",
  address: "123 Reggie Lane.",
  city: "Reggieland",
  state: "MA",
  zip: "12135",
  phone: "413-413-4133",
};

// this hook is used by Signup page. it provides state variables for form data,
// pending status, error messages, and a function to submit the form

export const useUserSignup = () => {
  const { redirectAuthorizedUser, setIsLoggedIn, isProduction } =
    useContext(AuthContext);
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<TExpressValidatorError[]>([]);
  const [formData, setFormData] = useState<TUserSignup>(
    isProduction ? ({} as TUserSignup) : dummySignup,
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
      } else if (errors) {
        // api validation errors
        setErrors(errors);
        logEvent({
          category: "user",
          action: "signup",
          label: "validation error",
        });
      }
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
