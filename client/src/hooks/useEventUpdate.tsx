import { AuthContext } from "@/hooks/useAuthContext";
import { useEventData } from "@/hooks/useEventData";
import { TExpressValidatorError } from "@/types/apiResponseTypes";
import { TEvent } from "@/types/eventTypes";
import { apiService } from "@/utils/apiService";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

// this hook is used by EventUpdate page. it provides state variables for form data,
// pending status, error messages, and functions to submit the form and delete the event

export const useEventUpdate = (eventId: string) => {
  const navigate = useNavigate();
  const { redirectUnauthorizedUser } = useContext(AuthContext);
  const [formData, setFormData] = useState<TEvent>();
  const [isEventActionPending, setIsEventActionPending] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [updateErrors, setUpdateErrors] = useState<TExpressValidatorError[]>(
    [],
  );
  const {
    eventData,
    isPending: isEventDataPending,
    error: eventDataError,
  } = useEventData(eventId);

  // on initial render, retrieve fresh event data from server using useEventData hook.
  // this hook (useEventUpdate) returns useEventData's isEventDataPending & error states
  // as well, so we can use those to render a loading spinner or error page.

  useEffect(() => {
    if (!eventData) return;
    setFormData(eventData);
  }, [eventData]);

  // update event data on server

  const updateEvent = async () => {
    setUpdateErrors([]);
    setIsEventActionPending(true);
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
      if (errors) setUpdateErrors(errors);
    } catch {
      console.error("Something went wrong. Try again later.");
    } finally {
      setIsEventActionPending(false);
    }
  };

  // delete event from server

  const deleteEvent = async () => {
    redirectUnauthorizedUser();
    if (!eventId) {
      setIsEventActionPending(false);
      navigate("/user");
      return;
    }
    setDeleteError("");
    setIsEventActionPending(true);
    try {
      const {
        data: { deleted, msg },
      } = await apiService<TEventDeleteResponse>({
        path: `event/${eventId}`,
        method: "DELETE",
      });
      if (deleted) {
        navigate("/user");
        return;
      }
      setDeleteError(msg);
    } catch {
      console.error("Something went wrong. Try again later.");
    } finally {
      setIsEventActionPending(false);
    }
  };

  return {
    formData,
    setFormData,
    updateEvent,
    deleteEvent,
    updateErrors,
    deleteError,
    isEventActionPending,
    isEventDataPending,
    eventDataError,
  };
};
