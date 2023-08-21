import { Button } from "@/components/common/Button/Button";
import { HourglassSpinner } from "@/components/common/HourglassSpinner/HourglassSpinner";
import ScrollAnimator from "@/components/common/ScrollAnimator/ScrollAnimator";
import { useCreateEvent } from "@/hooks/useEventCreate";
import { useInputChange } from "@/hooks/useInputChange";
import { getExpressValidatorError, onFormSubmit } from "@/utils/forms";
import { FC } from "react";
import styles from "./EventForm.module.scss";

export const EventForm: FC = () => {
  const { formData, setFormData, createEvent, isPending, errors } =
    useCreateEvent();
  const handleSubmitForm = onFormSubmit(createEvent);
  const handleInputChange = useInputChange(setFormData);

  if (isPending) return <HourglassSpinner />;

  if (!isPending)
    return (
      <section className={`content-spacer ${styles.eventForm}`}>
        <ScrollAnimator
          type="SLIDE_DOWN"
          className={`column ${styles.loginWrapper}`}
        >
          <form className={styles.form} onSubmit={handleSubmitForm}>
            <div className="form-header">
              <h2>Create Event</h2>
              <p>Receive a free estimate for your event.</p>
            </div>

            <div className="input-group">
              <label htmlFor="date">Event Date</label>
              <input
                type="date"
                name="date"
                id="date"
                onChange={handleInputChange}
                value={formData.date}
                required
              />
              {errors.length > 0 && (
                <p className="error">
                  {getExpressValidatorError("username", errors)}
                </p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="time">Time</label>
              <input
                type="time"
                name="time"
                id="time"
                onChange={handleInputChange}
                value={formData.time}
                required
              />
              {errors.length > 0 && (
                <p className="error">
                  {getExpressValidatorError("time", errors)}
                </p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="locationDescription">Location Description</label>
              <input
                type="text"
                name="locationDescription"
                id="locationDescription"
                onChange={handleInputChange}
                value={formData.locationDescription}
                required
              />
              {errors.length > 0 && (
                <p className="error">
                  {getExpressValidatorError("locationDescription", errors)}
                </p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                onChange={handleInputChange}
                value={formData.address}
                required
              />
              {errors.length > 0 && (
                <p className="error">
                  {getExpressValidatorError("address", errors)}
                </p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                onChange={handleInputChange}
                value={formData.city}
                required
              />
              {errors.length > 0 && (
                <p className="error">
                  {getExpressValidatorError("city", errors)}
                </p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                name="state"
                id="state"
                onChange={handleInputChange}
                value={formData.state}
                required
              />
              {errors.length > 0 && (
                <p className="error">
                  {getExpressValidatorError("state", errors)}
                </p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="zip">Zip Code</label>
              <input
                type="text"
                name="zip"
                id="zip"
                maxLength={5}
                onChange={handleInputChange}
                value={formData.zip || ""}
                required
              />
              {errors.length > 0 && (
                <p className="error">
                  {getExpressValidatorError("zip", errors)}
                </p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="guests">Number of Guests</label>
              <input
                type="text"
                name="guests"
                id="guests"
                maxLength={5}
                onChange={handleInputChange}
                value={formData.guests || ""}
                required
              />
              {errors.length > 0 && (
                <p className="error">
                  {getExpressValidatorError("guests", errors)}
                </p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="hours">Number of Hours</label>
              <input
                type="text"
                name="hours"
                id="hours"
                maxLength={5}
                onChange={handleInputChange}
                value={formData.hours || ""}
                required
              />
              {errors.length > 0 && (
                <p className="error">
                  {getExpressValidatorError("hours", errors)}
                </p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="eventType">Event Type</label>
              <input
                type="text"
                name="eventType"
                id="eventType"
                maxLength={5}
                onChange={handleInputChange}
                value={formData.eventType}
                required
              />
              {errors.length > 0 && (
                <p className="error">
                  {getExpressValidatorError("eventType", errors)}
                </p>
              )}
            </div>

            <fieldset>
              <legend>What services do you need?</legend>

              <div className="input-group">
                <label htmlFor="needBar">
                  <input
                    type="checkbox"
                    name="needBar"
                    id="needBar"
                    maxLength={5}
                    onChange={handleInputChange}
                    checked={formData.needBar ? true : false}
                  />
                  Mobile Bar
                </label>
                {errors.length > 0 && (
                  <p className="error">
                    {getExpressValidatorError("needBar", errors)}
                  </p>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="needTent">
                  <input
                    type="checkbox"
                    name="needTent"
                    id="needTent"
                    maxLength={5}
                    onChange={handleInputChange}
                    checked={formData.needTent ? true : false}
                  />
                  Tent
                </label>
                {errors.length > 0 && (
                  <p className="error">
                    {getExpressValidatorError("needTent", errors)}
                  </p>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="needAlcohol">
                  <input
                    type="checkbox"
                    name="needAlcohol"
                    id="needAlcohol"
                    maxLength={5}
                    onChange={handleInputChange}
                    checked={formData.needAlcohol ? true : false}
                  />
                  Alcohol
                </label>
                {errors.length > 0 && (
                  <p className="error">
                    {getExpressValidatorError("needAlcohol", errors)}
                  </p>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="needRunningWater">
                  <input
                    type="checkbox"
                    name="needRunningWater"
                    id="needRunningWater"
                    maxLength={5}
                    onChange={handleInputChange}
                    checked={formData.needRunningWater ? true : false}
                  />
                  Running Water
                </label>
                {errors.length > 0 && (
                  <p className="error">
                    {getExpressValidatorError("needRunningWater", errors)}
                  </p>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="needRefrigeration">
                  <input
                    type="checkbox"
                    name="needRefrigeration"
                    id="needRefrigeration"
                    maxLength={5}
                    onChange={handleInputChange}
                    checked={formData.needRefrigeration ? true : false}
                  />
                  Refrigeration
                </label>
                {errors.length > 0 && (
                  <p className="error">
                    {getExpressValidatorError("needRefrigeration", errors)}
                  </p>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="needDrinkware">
                  <input
                    type="checkbox"
                    name="needDrinkware"
                    id="needDrinkware"
                    maxLength={5}
                    onChange={handleInputChange}
                    checked={formData.needDrinkware ? true : false}
                  />
                  Disposable Drinkware
                </label>
                {errors.length > 0 && (
                  <p className="error">
                    {getExpressValidatorError("needDrinkware", errors)}
                  </p>
                )}
              </div>
            </fieldset>

            <fieldset>
              <legend>What beverages do you want to serve?</legend>
              <div className="input-group">
                <label htmlFor="beer">
                  <input
                    type="checkbox"
                    name="beer"
                    id="beer"
                    maxLength={5}
                    onChange={handleInputChange}
                    checked={formData.beer ? true : false}
                  />
                  Beer
                </label>
                {errors.length > 0 && (
                  <p className="error">
                    {getExpressValidatorError("beer", errors)}
                  </p>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="wine">
                  <input
                    type="checkbox"
                    name="wine"
                    id="wine"
                    maxLength={5}
                    onChange={handleInputChange}
                    checked={formData.wine ? true : false}
                  />
                  Wine
                </label>
                {errors.length > 0 && (
                  <p className="error">
                    {getExpressValidatorError("wine", errors)}
                  </p>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="specialtyDrinks">
                  <input
                    type="checkbox"
                    name="specialtyDrinks"
                    id="specialtyDrinks"
                    maxLength={5}
                    onChange={handleInputChange}
                    checked={formData.specialtyDrinks ? true : false}
                  />
                  Specialty Drinks
                </label>
                {errors.length > 0 && (
                  <p className="error">
                    {getExpressValidatorError("specialtyDrinks", errors)}
                  </p>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="liquorPreferences">Liquor Preferences</label>
                <input
                  type="text"
                  name="liquorPreferences"
                  id="liquorPreferences"
                  maxLength={200}
                  onChange={handleInputChange}
                  value={formData.liquorPreferences}
                  required
                />
                {errors.length > 0 && (
                  <p className="error">
                    {getExpressValidatorError("liquorPreferences", errors)}
                  </p>
                )}
              </div>
            </fieldset>

            <Button type="primary">Submit Estimate Request</Button>
          </form>
        </ScrollAnimator>
      </section>
    );
};
