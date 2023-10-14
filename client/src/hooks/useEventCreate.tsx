import { AuthContext } from "@/hooks/useAuthContext";
import { TExpressValidatorError } from "@/types/apiResponseTypes";
import { TEvent } from "@/types/eventTypes";
import { logEvent } from "@/utils/analytics";
import { apiService } from "@/utils/apiService";
import { getErrorMessage } from "@/utils/errors";
import { MOCK_EVENT } from "@/utils/mockData";
import { useContext, useEffect, useState } from "react";

type TCreateEventResponse = {
  errors?: TExpressValidatorError[];
  eventId?: string;
};

// this hook is used by EventCreate page. it provides state variables for form data,
// pending status, error messages, and a function to submit the form

export const useCreateEvent = () => {
  const [isPending, setIsPending] = useState(false);
  const [createdEventId, setCreatedEventId] = useState<null | string>(null);
  const { redirectUnauthorizedUser, isProduction } = useContext(AuthContext);
  const [errors, setErrors] = useState<TExpressValidatorError[]>([]);
  const [formData, setFormData] = useState<TEvent>(
    isProduction ? ({} as TEvent) : MOCK_EVENT,
  );

  // on initial render, redirect unauthorized users to login page

  useEffect(() => {
    redirectUnauthorizedUser();
  }, [redirectUnauthorizedUser]);

  // on form submission, send form data to server and set createdEventId state variable
  // to the id of the newly created event

  const createEvent = async () => {
    setErrors([]);
    setIsPending(true);
    try {
      const {
        data: { eventId, errors },
      } = await apiService<TCreateEventResponse>({
        path: "event/",
        method: "POST",
        body: formData,
      });
      // successful event creation
      if (eventId) {
        setCreatedEventId(eventId);
        logEvent({
          category: "event",
          action: "create event",
          label: "success",
        });
        return;
      }
      // api validation errors
      if (errors) {
        setErrors(errors);
        logEvent({
          category: "event",
          action: "create event",
          label: "validation error",
        });
        return;
      }
      // server error
      throw new Error(
        "Server error: No event or validation errors returned from API.",
      );
    } catch (e) {
      // other errors
      const error = getErrorMessage(e);
      logEvent({
        category: "event",
        action: "create event",
        label: error,
      });
    } finally {
      setIsPending(false);
    }
  };

  return {
    formData,
    setFormData,
    createEvent,
    errors,
    createdEventId,
    isPending,
  };
};
