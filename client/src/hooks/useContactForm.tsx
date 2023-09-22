import { TExpressValidatorError } from "@/types/apiResponseTypes";
import { apiService } from "@/utils/apiService";
import { useState } from "react";

type TContactResponse = {
  errors?: TExpressValidatorError[];
  msg: string;
};

export const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isPending, setIsPending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState<TExpressValidatorError[]>([]);

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

      if (errors) {
        setErrors(errors);
        return;
      }

      setIsSent(true);
    } catch {
      console.error("Something went wrong while submitting the form.");
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
