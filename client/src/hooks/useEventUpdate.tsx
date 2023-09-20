import { AuthContext } from "@/hooks/useAuthContext";
import { TExpressValidatorError } from "@/types/apiResponseTypes";
import { TEvent, TEventWithId } from "@/types/eventTypes";
import { apiService } from "@/utils/apiService";
import { formatDateWithDashes } from "@/utils/formatters";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type TEventGetResponse = {
  msg: string;
  event: TEventWithId;
};

type TEventUpdateResponse = {
  msg: string;
  event: TEvent;
  updated?: boolean;
  errors?: TExpressValidatorError[];
};

type TEventDeleteResponse = {
  msg: string;
  deleted?: boolean;
};

export const useEventUpdate = (eventId: string) => {
  const navigate = useNavigate();
  const { redirectUnauthorizedUser } = useContext(AuthContext);
  const [isPending, setIsPending] = useState(true);
  const [errors, setErrors] = useState<TExpressValidatorError[]>([]);
  const [formData, setFormData] = useState<TEvent>();

  // on initial render, retrieve event data from server
  useEffect(() => {
    const getEventData = async () => {
      if (!eventId) {
        setIsPending(false);
        navigate("/user");
        return;
      }

      setIsPending(true);
      setErrors([]);

      try {
        const {
          data: { event },
        } = await apiService<TEventGetResponse>({
          path: `event/${eventId}`,
        });

        if (event) {
          const date = formatDateWithDashes(event.date);
          setFormData({ ...event, date: date });
        }
      } catch {
        console.error("Something went wrong. Try again later.");
      } finally {
        setIsPending(false);
      }
    };

    redirectUnauthorizedUser();
    void getEventData();
  }, [redirectUnauthorizedUser, eventId, navigate]);

  const updateEvent = async () => {
    setErrors([]);
    setIsPending(true);

    try {
      const {
        data: { updated, errors },
      } = await apiService<TEventUpdateResponse>({
        method: "PATCH",
        path: `event/${eventId}`,
        body: formData,
      });

      if (updated) {
        navigate(`/event/${eventId}`);
        return;
      }

      if (errors) setErrors(errors);
    } catch {
      console.error("Something went wrong. Try again later.");
    } finally {
      setIsPending(false);
    }
  };

  const deleteEvent = async () => {
    redirectUnauthorizedUser();
    if (!eventId) {
      setIsPending(false);
      navigate("/user");
      return;
    }

    setErrors([]);
    setIsPending(true);

    try {
      const {
        data: { deleted },
      } = await apiService<TEventDeleteResponse>({
        path: `event/${eventId}`,
        method: "DELETE",
      });

      if (deleted) navigate("/user");
    } catch {
      console.error("Something went wrong. Try again later.");
    } finally {
      setIsPending(false);
    }
  };

  return { formData, setFormData, updateEvent, deleteEvent, errors, isPending };
};
