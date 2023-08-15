import { Button } from "@/components/common/Button/Button";
import ScrollAnimator from "@/components/common/ScrollAnimator/ScrollAnimator";
import { AuthContext } from "@/hooks/useAuthContext";
import { TEventWithId } from "@/types/eventTypes";
import { getApiEndpoint } from "@/utils/apiConfig";
import { formatDate, formatTime } from "@/utils/formatters";
import { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type TEventApiResponse = {
  msg: string;
  event: TEventWithId;
};

export const Event: FC = () => {
  const navigate = useNavigate();
  const { id: eventId } = useParams();
  const { isLoggedIn } = useContext(AuthContext);
  const [eventData, setEventData] = useState<TEventWithId | null>(null);
  const [error, setError] = useState("");

  useEffect(
    function fetchUserDataOnInitialPageLoad() {
      if (!isLoggedIn) {
        navigate("/login");
        return;
      }

      getUserData().catch((error: Error) => setError(error.message));

      async function getUserData() {
        if (!eventId) return;

        const apiBasePath = getApiEndpoint();
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
      }
    },
    [isLoggedIn, navigate, eventId],
  );

  const handleDelete = async () => {
    if (!eventId) return;

    const apiBasePath = getApiEndpoint();
    const url = `${apiBasePath}/event/${eventId}`;
    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status === 200) {
        navigate("/user");
      }
    } catch (e) {
      console.log(e);
      throw new Error(
        "Something went wrong while retrieving your event. Try again later.",
      );
    }
  };

  return (
    <section className="content-spacer user-section">
      <ScrollAnimator type="SLIDE_DOWN" className="column user-section-wrapper">
        <h2>Your Event</h2>

        {eventData && (
          <ScrollAnimator type="SLIDE_DOWN" className="user-section-card">
            <h4>Details</h4>

            <p>{eventData.eventType}</p>
            <p>
              {formatTime(eventData.time)} on {formatDate(eventData.date)}
            </p>
            <p>Guests: {eventData.guests}</p>
            <p>Hours: {eventData.hours}</p>

            <h4>Location</h4>

            <p>Located: {eventData.locationDescription}</p>
            <p>{eventData.address}</p>
            <p>
              {eventData.city}, {eventData.state} {eventData.zip}
            </p>

            <h4>Services</h4>

            {eventData.needBar && <p>Mobile Bar</p>}
            {eventData.needTent && <p>Tent</p>}
            {eventData.needAlcohol && <p>Alcohol</p>}
            {eventData.needRunningWater && <p>Running Water</p>}
            {eventData.needRefrigeration && <p>Refrigeration</p>}
            {eventData.needDrinkware && <p>Drinkware</p>}
            {eventData.beer && <p>Beer</p>}
            {eventData.wine && <p>Wine</p>}
            {eventData.specialtyDrinks && <p>Specialty Drinks</p>}

            <h4>Liquor Preferences</h4>

            {eventData.liquorPreferences}
          </ScrollAnimator>
        )}

        <ScrollAnimator type="SLIDE_DOWN" className="button-wrapper">
          <Button type="primary" onClick={handleDelete}>
            Delete Event
          </Button>
          <Button type="primary" onClick={() => navigate("/user")}>
            Back to Dashboard
          </Button>
        </ScrollAnimator>

        {error && <p className="error">{error}</p>}
      </ScrollAnimator>
    </section>
  );
};
