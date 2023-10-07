import { AuthContext } from "@/hooks/useAuthContext";
import { TExpressValidatorError } from "@/types/apiResponseTypes";
import { TEvent } from "@/types/eventTypes";
import { apiService } from "@/utils/apiService";
import { useContext, useEffect, useState } from "react";

type TCreateEventResponse = {
  errors?: TExpressValidatorError[];
  eventId?: string;
};

// this dummy data is used in development mode to pre-populate the event create form
// so that it's easier to test the form validation and submission
// (the form is otherwise blank on initial render)

const dummyEvent = {
  date: "2025-10-15",
  time: "17:00",
  locationDescription: "Around back",
  address: "123 Circle Dr.",
  city: "West Springfield",
  state: "MA",
  zip: "01089",
  guests: 25,
  hours: 4,
  eventType: "Birthday",
  needBar: true,
  needTent: false,
  needAlcohol: true,
  needDrinkware: true,
  beer: true,
  wine: true,
  specialtyDrinks: false,
  liquorPreferences: "Premium liquors only.",
  additionalInfo: "Great web site!",
};

// this hook is used by EventCreate page. it provides state variables for form data,
// pending status, error messages, and a function to submit the form

export const useCreateEvent = () => {
  const [isPending, setIsPending] = useState(false);
  const [createdEventId, setCreatedEventId] = useState<null | string>(null);
  const { redirectUnauthorizedUser, isProduction } = useContext(AuthContext);
  const [errors, setErrors] = useState<TExpressValidatorError[]>([]);
  const [formData, setFormData] = useState<TEvent>(
    isProduction ? ({} as TEvent) : dummyEvent,
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
      if (errors) {
        setErrors(errors);
        return;
      }
      if (!eventId) {
        throw new Error("Something went wrong. Try again later.");
      }
      setCreatedEventId(eventId);
    } catch (e) {
      console.error(e);
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
