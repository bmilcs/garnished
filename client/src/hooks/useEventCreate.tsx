import { AuthContext } from "@/hooks/useAuthContext";
import { TExpressValidatorError } from "@/types/apiResponseTypes";
import { TEvent } from "@/types/eventTypes";
import { apiService } from "@/utils/apiService";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type TCreateEventResponse = {
  errors?: TExpressValidatorError[];
  eventId?: string;
};

// authcontext uses a string for error messages
// but signup utilizes an array of express-validator errors.
// moving this to authContext would require refactoring.
// for now, this custom hook will be the solution.

export const useCreateEvent = () => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const { redirectUnauthorizedUser } = useContext(AuthContext);
  const [errors, setErrors] = useState<TExpressValidatorError[]>([]);
  const [formData, setFormData] = useState<TEvent>({
    date: "1999-10-15",
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
    liquorPreferences: "",
  });

  useEffect(() => {
    redirectUnauthorizedUser();
  }, [redirectUnauthorizedUser]);

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
        console.error("errors: Something went wrong. Try again later.");
        return;
      }

      navigate(`/event/${eventId}`);
    } catch (e) {
      console.error("errors:", e);
    } finally {
      setIsPending(false);
    }
  };

  return { formData, setFormData, createEvent, errors, isPending };
};
