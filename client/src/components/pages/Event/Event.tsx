import AnimatedDiv from "@/components/common/AnimatedDiv/AnimatedDiv";
import { Button } from "@/components/common/Button/Button";
import { HourglassSpinner } from "@/components/common/HourglassSpinner/HourglassSpinner";
import { ErrorPage } from "@/components/pages/ErrorPage/ErrorPage";
import { useEventData } from "@/hooks/useEventData";
import { formatDate, formatTime } from "@/utils/formatters";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Event: FC = () => {
  const { id: eventId } = useParams();
  const { eventData, error, isPending } = useEventData(eventId ?? "");
  const navigate = useNavigate();

  // pending status: waiting on event data fetch request to complete

  if (isPending) return <HourglassSpinner />;

  // error status: no event data after pending status is set to false

  if (!eventData) {
    return <ErrorPage title="404" subtitle="Event not found." />;
  }

  // success status: no pending or error statuses present

  return (
    <section className="content-spacer user-section">
      <AnimatedDiv type="SLIDE_DOWN" className="column user-section-wrapper">
        <h2 className="user-section-heading">Your Event</h2>

        <AnimatedDiv type="SLIDE_DOWN" className="user-section-card">
          {/* event details */}

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

          {/* list of services */}

          <h4>Services</h4>
          {eventData.needBar && <p>Mobile Bar</p>}
          {eventData.needTent && <p>Tent</p>}
          {eventData.needAlcohol && <p>Alcohol</p>}
          {eventData.needDrinkware && <p>Drinkware</p>}
          {eventData.beer && <p>Beer</p>}
          {eventData.wine && <p>Wine</p>}
          {eventData.specialtyDrinks && <p>Specialty Drinks</p>}

          {/* liquor preferences */}

          {eventData.liquorPreferences && (
            <>
              <h4>Liquor Preferences</h4>
              <p>{eventData.liquorPreferences}</p>
            </>
          )}

          {/* additional info */}

          {eventData.additionalInfo && (
            <>
              <h4>Additional Information</h4>
              <p>{eventData.additionalInfo}</p>
            </>
          )}
        </AnimatedDiv>

        {/* bottom buttons */}

        <AnimatedDiv
          when="IN_VIEW"
          type="SLIDE_UP"
          delay={0.4}
          className="button-wrapper"
        >
          <Button type="outline" onClick={() => navigate("/user")}>
            Return to Dashboard
          </Button>
          <Button
            type="outline"
            onClick={() => navigate(`/event/${eventData?._id ?? ""}/update`)}
          >
            Edit Event
          </Button>
        </AnimatedDiv>

        {error && <p className="error">{error}</p>}
      </AnimatedDiv>
    </section>
  );
};
