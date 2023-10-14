import { AuthContext } from "@/hooks/useAuthContext";
import { TEventWithId } from "@/types/eventTypes";
import { logEvent } from "@/utils/analytics";
import { apiService } from "@/utils/apiService";
import { getErrorMessage } from "@/utils/errors";
import { formatDateWithDashes } from "@/utils/formatters";
import { useContext, useEffect, useState } from "react";

type TEventGetApiResponse = {
  msg: string;
  event: TEventWithId;
};

export const useEventData = (eventId: string) => {
  const { redirectUnauthorizedUser } = useContext(AuthContext);
  const [isPending, setIsPending] = useState(true);
  const [eventData, setEventData] = useState<TEventWithId>();
  const [error, setError] = useState("");

  // on initial render, retrieve event data from server and
  // set state variables accordingly

  useEffect(() => {
    redirectUnauthorizedUser();

    const getEventData = async () => {
      setIsPending(true);
      setError("");
      if (!eventId) {
        setError("No event ID provided.");
        setIsPending(false);
        logEvent({
          category: "event",
          action: "get event data",
          label: "no event ID provided",
        });
        return;
      }
      try {
        const {
          data: { event, msg },
        } = await apiService<TEventGetApiResponse>({
          path: `event/${eventId}`,
        });
        // successful retrieval
        if (event) {
          const date = formatDateWithDashes(event.date);
          setEventData({ ...event, date: date });
          return;
        }
        // no event found
        if (msg) {
          setError(msg);
          logEvent({
            category: "event",
            action: "get event data",
            label: msg,
          });
          return;
        }
        // server error
        throw new Error(
          "Server error: No event data or error received from API",
        );
      } catch (e) {
        // all errors
        const error = getErrorMessage(e);
        logEvent({
          category: "event",
          action: "get event data",
          label: error,
        });
      } finally {
        setIsPending(false);
      }
    };

    void getEventData();
  }, [redirectUnauthorizedUser, eventId]);

  return { eventData, isPending, error };
};
