import { Button } from "@/components/common/Button/Button";
import { HourglassSpinner } from "@/components/common/HourglassSpinner/HourglassSpinner";
import { Input } from "@/components/common/Input/Input";
import { Modal } from "@/components/common/Modal/Modal";
import ScrollAnimator from "@/components/common/ScrollAnimator/ScrollAnimator";
import { ErrorPage } from "@/components/pages/ErrorPage/ErrorPage";
import { useEventUpdate } from "@/hooks/useEventUpdate";
import { useInputChange } from "@/hooks/useInputChange";
import { getExpressValidatorError, onFormSubmit } from "@/utils/forms";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";

export const EventUpdate: FC = () => {
  const { id: eventId } = useParams();
  const { formData, setFormData, updateEvent, deleteEvent, isPending, errors } =
    useEventUpdate(eventId ?? "");
  const handleSubmitForm = onFormSubmit(updateEvent);
  const handleInputChange = useInputChange(setFormData);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (isPending) return <HourglassSpinner />;

  if (!isPending && !formData)
    return <ErrorPage title="404" subtitle="Event not found." />;

  if (formData)
    return (
      <section className="content-spacer user-section">
        <ScrollAnimator type="SLIDE_DOWN" className="column">
          <form onSubmit={handleSubmitForm}>
            <div className="form-header">
              <h2>Update Event Info</h2>
              <p>Need to make some changes? Update your event below:</p>
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
              maxLength={300}
              onChange={handleInputChange}
              value={formData.liquorPreferences}
              error={getExpressValidatorError("liquorPreferences", errors)}
            />

            <Button type="primary">Update Event Details</Button>
          </form>
        </ScrollAnimator>

        <Button type="outline" onClick={() => setShowDeleteModal(true)}>
          Delete Event
        </Button>

        {showDeleteModal && (
          <Modal
            title="Delete Event?"
            message="Are you sure you want to delete your event? This action cannot be undone."
          >
            <div className="button-wrapper">
              <Button
                type="outline"
                onClick={deleteEvent}
                className="margin-right"
              >
                Delete Event
              </Button>

              <Button
                type="primary"
                onClick={() => setShowDeleteModal(false)}
                className="margin-right"
              >
                Cancel
              </Button>
            </div>
          </Modal>
        )}
      </section>
    );
};
