import { AuthContext } from "@/hooks/useAuthContext";
import { TExpressValidatorError } from "@/types/apiResponseTypes";
import { TUserSignup } from "@/types/userTypes";
import { apiService } from "@/utils/apiService";
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
      setIsPending(false);
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
      if (authenticated) {
        setIsLoggedIn(true);
      } else if (errors) {
        setErrors(errors);
      }
    } catch {
      console.error("Something went wrong. Try again later.");
    } finally {
      setIsPending(false);
    }
  };

  return { formData, setFormData, signup, errors, isPending };
};
