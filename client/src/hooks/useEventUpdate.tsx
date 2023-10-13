import { AuthContext } from "@/hooks/useAuthContext";
import { useEventData } from "@/hooks/useEventData";
import { TExpressValidatorError } from "@/types/apiResponseTypes";
import { TEvent } from "@/types/eventTypes";
import { logEvent } from "@/utils/analytics";
import { apiService } from "@/utils/apiService";
import { getErrorMessage } from "@/utils/errors";
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
      // successful update
      if (updated) {
        logEvent({
          category: "event",
          action: "update event",
          label: "success",
        });
        navigate(`/event/${eventId}`);
        return;
      }
      // api validation errors
      if (errors) {
        setUpdateErrors(errors);
        logEvent({
          category: "event",
          action: "update event",
          label: "validation error",
        });
      }
    } catch (e) {
      // other errors
      const error = getErrorMessage(e);
      logEvent({
        category: "event",
        action: "update event",
        label: error,
      });
    } finally {
      setIsEventActionPending(false);
    }
  };

  // delete event from server

  const deleteEvent = async () => {
    redirectUnauthorizedUser();
    if (!eventId) {
      logEvent({
        category: "event",
        action: "delete event",
        label: "no event ID provided",
      });
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
      // successful deletion
      if (deleted) {
        navigate("/user");
        logEvent({
          category: "event",
          action: "delete event",
          label: "success",
        });
        return;
      }
      // api error
      setDeleteError(msg);
      logEvent({
        category: "event",
        action: "delete event",
        label: `api error: ${msg}`,
      });
    } catch (e) {
      // other errors
      const error = getErrorMessage(e);
      logEvent({
        category: "event",
        action: "delete event",
        label: error,
      });
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
