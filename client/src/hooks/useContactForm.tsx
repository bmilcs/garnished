import { TExpressValidatorError } from "@/types/apiResponseTypes";
import { logEvent } from "@/utils/analytics";
import { apiService } from "@/utils/apiService";
import { getErrorMessage } from "@/utils/errors";
import { useState } from "react";

type TContactResponse = {
  errors?: TExpressValidatorError[];
  msg: string;
};

// this hook is used by Contact page. it provides state variables for form data,
// pending status, error messages, and a function to submit the form

export const useContactForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState<TExpressValidatorError[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const submitContactForm = async () => {
    setErrors([]);
    setIsSent(false);
    setIsPending(true);
    try {
      const {
        data: { errors },
      } = await apiService<TContactResponse>({
        path: "contact",
        method: "POST",
        body: formData,
      });
      // api validation errors
      if (errors) {
        setErrors(errors);
        logEvent({
          category: "contact",
          action: "submit contact form",
          label: "validation error",
        });
        return;
      }
      // successful form submission
      setIsSent(true);
      logEvent({
        category: "contact",
        action: "submit contact form",
        label: "success",
      });
    } catch (e) {
      // other errors
      const error = getErrorMessage(e);
      logEvent({
        category: "contact",
        action: "submit contact form",
        label: error,
      });
    } finally {
      setIsPending(false);
    }
  };

  return {
    formData,
    setFormData,
    submitContactForm,
    errors,
    isSent,
    isPending,
  };
};
