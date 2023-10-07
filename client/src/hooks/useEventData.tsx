import { AuthContext } from "@/hooks/useAuthContext";
import { TEventWithId } from "@/types/eventTypes";
import { apiService } from "@/utils/apiService";
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
      if (!eventId) {
        setError("No event ID provided.");
        setIsPending(false);
        return;
      }
      setIsPending(true);
      setError("");
      try {
        const {
          data: { event },
        } = await apiService<TEventGetApiResponse>({
          path: `event/${eventId}`,
        });
        if (event) {
          const date = formatDateWithDashes(event.date);
          setEventData({ ...event, date: date });
        }
      } catch {
        setError(
          "Something went wrong while retrieving your event. Try again later.",
        );
      } finally {
        setIsPending(false);
      }
    };

    void getEventData();
  }, [redirectUnauthorizedUser, eventId]);

  return { eventData, isPending, error };
};
