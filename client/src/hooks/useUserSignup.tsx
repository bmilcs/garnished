import { AuthContext } from "@/hooks/useAuthContext";
import { TExpressValidatorError } from "@/types/apiResponseTypes";
import { apiService } from "@/utils/apiService";
import { useContext, useEffect, useState } from "react";

type TSignupResponse = {
  msg: string;
  authenticated?: boolean;
  errors?: TExpressValidatorError[];
};

// signup utilizes an array of express-validator errors, so
// moving this to authContext would require refactoring.
// for now, this custom hook will be the solution.

export const useUserSignup = () => {
  const { redirectAuthorizedUser, setIsLoggedIn } = useContext(AuthContext);
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<TExpressValidatorError[]>([]);
  const [formData, setFormData] = useState({
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
  });

  // redirect user to /user when logged in
  useEffect(() => {
    redirectAuthorizedUser();
  }, [redirectAuthorizedUser]);

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
