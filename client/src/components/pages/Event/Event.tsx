import { AuthContext } from "@/hooks/useAuthContext";
import { TEvent } from "@/types/eventTypes";
import { getApiEndpoint } from "@/utils/apiConfig";
import { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Event.module.scss";

type TEventApiResponse = {
  msg: string;
  event: TEvent;
};

export const Event: FC = () => {
  const navigate = useNavigate();
  const { id: eventId } = useParams();
  const { isLoggedIn } = useContext(AuthContext);
  const [eventData, setEventData] = useState<TEvent | null>(null);
  const [error, setError] = useState("");

  // retrieve user data on initial page load
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const getUserData = async () => {
      const apiBasePath = getApiEndpoint();

      if (!eventId) {
        console.log("No event id provided");
        return;
      }

      const url = `${apiBasePath}/event/${eventId}`;
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = (await res.json()) as TEventApiResponse;

        console.log(data);

        if (data.event) {
          // user is logged in, set user data
          setEventData(data.event);
        }
      } catch (e) {
        console.log(e);
        throw new Error(
          "Something went wrong while retrieving your event. Try again later.",
        );
      }
    };

    getUserData().catch((error: Error) => setError(error.message));
  }, [isLoggedIn, navigate, eventId]);

  return (
    <section className={`column content-spacer ${styles.signup}`}>
      <h2>Event Details</h2>

      {eventData && (
        <div>
          <p>{eventData.address}</p>
          <p>{eventData.city}</p>
          <p>{eventData.zip}</p>
          <p>{eventData.state}</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </section>
  );
};
