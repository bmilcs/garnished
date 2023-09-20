import { AuthContext } from "@/hooks/useAuthContext";
import { TEventWithId } from "@/types/eventTypes";
import { apiService } from "@/utils/apiService";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type TEventApiResponse = {
  msg: string;
  event: TEventWithId;
};

export const useEventData = (eventId: string) => {
  const navigate = useNavigate();
  const { redirectUnauthorizedUser } = useContext(AuthContext);
  const [isPending, setIsPending] = useState(true);
  const [eventData, setEventData] = useState<TEventWithId | null>(null);
  const [error, setError] = useState("");

  // on initial render, retrieve event data from server
  useEffect(() => {
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
        } = await apiService<TEventApiResponse>({
          path: `event/${eventId}`,
        });

        if (event) setEventData(event);
      } catch {
        setError(
          "Something went wrong while retrieving your event. Try again later.",
        );
      } finally {
        setIsPending(false);
      }
    };

    redirectUnauthorizedUser();
    void getEventData();
  }, [redirectUnauthorizedUser, eventId]);

  return { eventData, isPending, error };
};
