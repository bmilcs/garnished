import { Button } from "@/components/common/Button/Button";
import { HourglassSpinner } from "@/components/common/HourglassSpinner/HourglassSpinner";
import { Input } from "@/components/common/Input/Input";
import { Modal } from "@/components/common/Modal/Modal";
import ScrollAnimator from "@/components/common/ScrollAnimator/ScrollAnimator";
import { useCreateEvent } from "@/hooks/useEventCreate";
import { useInputChange } from "@/hooks/useInputChange";
import { getExpressValidatorError, onFormSubmit } from "@/utils/forms";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const EventForm: FC = () => {
  const {
    formData,
    setFormData,
    createEvent,
    isPending,
    createdEventId,
    errors,
  } = useCreateEvent();
  const handleSubmitForm = onFormSubmit(createEvent);
  const handleInputChange = useInputChange(setFormData);
  const navigate = useNavigate();

  if (isPending) {
    return <HourglassSpinner />;
  }

  if (createdEventId) {
    return (
      <Modal
        type="standard"
        title="Success!"
        message="Thank you for submitting your estimate request. The details have been sent to our customer service team and we will be in touch shortly."
        onClickCloseOrOverlay={() => navigate(`/event/${createdEventId}`)}
      >
        <Button
          type="primary"
          onClick={() => navigate(`/event/${createdEventId}`)}
        >
          View Event Details
        </Button>
      </Modal>
    );
  }

  return (
    <section className="content-spacer user-section">
      <ScrollAnimator type="SLIDE_DOWN" className="column">
        <form onSubmit={handleSubmitForm}>
          <div className="form-header">
            <h2>Create Event</h2>
            <p>Receive a free estimate for your event.</p>
          </div>

          <Input
            name="date"
            type="date"
            label="Event Date"
            onChange={handleInputChange}
            value={formData.date}
            required
            error={getExpressValidatorError("date", errors)}
          />

          <Input
            name="time"
            type="time"
            label="Event Starting Time"
            onChange={handleInputChange}
            value={formData.time}
            required
            error={getExpressValidatorError("time", errors)}
          />

          <Input
            name="address"
            type="text"
            label="Event Address"
            onChange={handleInputChange}
            value={formData.address}
            required
            error={getExpressValidatorError("address", errors)}
          />

          <Input
            name="city"
            type="text"
            label="Event City"
            onChange={handleInputChange}
            value={formData.city}
            required
            error={getExpressValidatorError("city", errors)}
          />

          <Input
            name="state"
            type="text"
            label="Event State"
            onChange={handleInputChange}
            value={formData.state}
            maxLength={2}
            required
            error={getExpressValidatorError("state", errors)}
          />

          <Input
            name="zip"
            type="text"
            label="Event Zip Code"
            onChange={handleInputChange}
            value={formData.zip || ""}
            maxLength={2}
            required
            error={getExpressValidatorError("zip", errors)}
          />

          <Input
            name="locationDescription"
            type="text"
            label="Directions / Location Description"
            onChange={handleInputChange}
            value={formData.locationDescription}
            required
            error={getExpressValidatorError("locationDescription", errors)}
          />

          <Input
            name="eventType"
            type="text"
            label="Type of Event"
            onChange={handleInputChange}
            value={formData.eventType}
            required
            error={getExpressValidatorError("eventType", errors)}
          />

          <Input
            name="guests"
            type="number"
            label="Guest Count"
            onChange={handleInputChange}
            value={formData.guests}
            maxLength={2}
            required
            error={getExpressValidatorError("guests", errors)}
          />

          <Input
            name="hours"
            type="number"
            label="Number of Hours"
            onChange={handleInputChange}
            value={formData.hours}
            maxLength={2}
            required
            error={getExpressValidatorError("hours", errors)}
          />

          <label>What services do you need?</label>

          <fieldset>
            <Input
              name="needBar"
              type="checkbox"
              label="Mobile Bar"
              onChange={handleInputChange}
              checked={formData.needBar}
              error={getExpressValidatorError("needBar", errors)}
            />

            <Input
              name="needTent"
              type="checkbox"
              label="Tent"
              onChange={handleInputChange}
              checked={formData.needTent}
              error={getExpressValidatorError("needTent", errors)}
            />

            <Input
              name="needAlcohol"
              type="checkbox"
              label="Alcohol"
              onChange={handleInputChange}
              checked={formData.needAlcohol}
              error={getExpressValidatorError("needAlcohol", errors)}
            />

            <Input
              name="needDrinkware"
              type="checkbox"
              label="Disposable Drinkware"
              onChange={handleInputChange}
              checked={formData.needDrinkware}
              error={getExpressValidatorError("needDrinkware", errors)}
            />
          </fieldset>

          <label>What beverages do you want to serve?</label>

          <fieldset>
            <Input
              name="beer"
              type="checkbox"
              label="Beer"
              onChange={handleInputChange}
              checked={formData.beer}
              error={getExpressValidatorError("beer", errors)}
            />

            <Input
              name="wine"
              type="checkbox"
              label="Wine"
              onChange={handleInputChange}
              checked={formData.wine}
              error={getExpressValidatorError("wine", errors)}
            />

            <Input
              name="specialtyDrinks"
              type="checkbox"
              label="Specialty Drinks"
              onChange={handleInputChange}
              checked={formData.specialtyDrinks}
              error={getExpressValidatorError("specialtyDrinks", errors)}
            />
          </fieldset>

          <Input
            name="liquorPreferences"
            type="textarea"
            label="Liquor Preferences (optional)"
            maxLength={200}
            onChange={handleInputChange}
            value={formData.liquorPreferences}
            error={getExpressValidatorError("liquorPreferences", errors)}
          />

          <Input
            name="additionalInfo"
            type="textarea"
            label="Additional Information (optional)"
            maxLength={1000}
            onChange={handleInputChange}
            value={formData.additionalInfo}
            error={getExpressValidatorError("additionalInfo", errors)}
          />

          <Button type="primary">Submit Estimate Request</Button>
        </form>
      </ScrollAnimator>
    </section>
  );
};
