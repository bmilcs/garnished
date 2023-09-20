import { Button } from "@/components/common/Button/Button";
import { HourglassSpinner } from "@/components/common/HourglassSpinner/HourglassSpinner";
import ScrollAnimator from "@/components/common/ScrollAnimator/ScrollAnimator";
import { useEventData } from "@/hooks/useEventData";
import { formatDate, formatTime } from "@/utils/formatters";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Event: FC = () => {
  const { id: eventId } = useParams();
  const { eventData, error, isPending } = useEventData(eventId ?? "");
  const navigate = useNavigate();

  if (isPending) return <HourglassSpinner />;

  return (
    <section className="content-spacer user-section">
      <ScrollAnimator type="SLIDE_DOWN" className="column user-section-wrapper">
        <h2 className="user-section-heading">Your Event</h2>

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
            {eventData.needDrinkware && <p>Drinkware</p>}
            {eventData.beer && <p>Beer</p>}
            {eventData.wine && <p>Wine</p>}
            {eventData.specialtyDrinks && <p>Specialty Drinks</p>}

            <h4>Liquor Preferences</h4>

            {eventData.liquorPreferences}
          </ScrollAnimator>
        )}

        <ScrollAnimator type="SLIDE_DOWN" className="button-wrapper">
          <Button
            type="secondary"
            onClick={() => navigate(`/event/${eventData?._id ?? ""}/update`)}
          >
            Edit Event
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
