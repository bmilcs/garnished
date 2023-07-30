import { Button } from "@/components/common/Button/Button";
import { AuthContext } from "@/hooks/useAuthContext";
import { TEvent } from "@/types/eventTypes";
import { getApiEndpoint } from "@/utils/apiConfig";
import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EventForm.module.scss";

type TEventResponse = {
  errors?: TEventResponseError[];
  eventId?: string;
};

type TEventResponseError = {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
};

export const EventForm: FC = () => {
  const { redirectUnauthorizedUser, isLoggedIn } = useContext(AuthContext);
  const apiBasePath = getApiEndpoint();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<TEventResponseError[]>([]);
  const [formData, setFormData] = useState<TEvent>({
    date: "1999-10-15",
    time: "17:00",
    locationDescription: "Around back",
    address: "123 Circle Dr.",
    city: "West Springfield",
    state: "MA",
    zip: "01089",
    guests: 25,
    hours: 4,
    eventType: "Birthday",
    needBar: true,
    needTent: false,
    needAlcohol: true,
    needRunningWater: true,
    needRefrigeration: true,
    needDrinkware: true,
    beer: true,
    wine: true,
    specialtyDrinks: false,
    liquorPreferences: "",
  });

  useEffect(() => {
    redirectUnauthorizedUser();
  }, [redirectUnauthorizedUser]);

  const submitEvent = async () => {
    // clear errors
    setErrors([]);

    const url = `${apiBasePath}/event/`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = (await res.json()) as TEventResponse;

      if (data.errors) {
        setErrors(data.errors);
        return;
      }

      // event created successfully
      const eventId = data.eventId;

      if (!eventId) {
        console.error("event id not found");
        return;
      }

      navigate(`/event/${eventId}`);
    } catch (e) {
      console.error("errors:", e);
    }
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitEvent().catch(e => console.error("signup error:", e));
  };

  // update form data on input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // toggle checkbox value on change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: checked,
    }));
  };

  // get field error message
  const getFieldError = (fieldName: string) => {
    if (errors.length === 0) return "";
    return errors
      .filter(error => error.path === fieldName)
      .map(error => error.msg)[0];
  };

  if (isLoggedIn) {
    return (
      <section className={`column content-spacer ${styles.signup}`}>
        <h2>Request Quote</h2>

        <form
          action={`${apiBasePath}/user/signup`}
          method="POST"
          className={styles.form}
          onSubmit={handleSubmitForm}
        >
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
              <p className="error">{getFieldError("username")}</p>
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
              <p className="error">{getFieldError("time")}</p>
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
              <p className="error">{getFieldError("locationDescription")}</p>
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
              <p className="error">{getFieldError("address")}</p>
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
              <p className="error">{getFieldError("city")}</p>
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
              <p className="error">{getFieldError("state")}</p>
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
              <p className="error">{getFieldError("zip")}</p>
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
              <p className="error">{getFieldError("guests")}</p>
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
              <p className="error">{getFieldError("hours")}</p>
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
              <p className="error">{getFieldError("eventType")}</p>
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
                  onChange={handleCheckboxChange}
                  checked={formData.needBar ? true : false}
                />
                Mobile Bar
              </label>
              {errors.length > 0 && (
                <p className="error">{getFieldError("needBar")}</p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="needTent">
                <input
                  type="checkbox"
                  name="needTent"
                  id="needTent"
                  maxLength={5}
                  onChange={handleCheckboxChange}
                  checked={formData.needTent ? true : false}
                />
                Tent
              </label>
              {errors.length > 0 && (
                <p className="error">{getFieldError("needTent")}</p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="needAlcohol">
                <input
                  type="checkbox"
                  name="needAlcohol"
                  id="needAlcohol"
                  maxLength={5}
                  onChange={handleCheckboxChange}
                  checked={formData.needAlcohol ? true : false}
                />
                Alcohol
              </label>
              {errors.length > 0 && (
                <p className="error">{getFieldError("needAlcohol")}</p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="needRunningWater">
                <input
                  type="checkbox"
                  name="needRunningWater"
                  id="needRunningWater"
                  maxLength={5}
                  onChange={handleCheckboxChange}
                  checked={formData.needRunningWater ? true : false}
                />
                Running Water
              </label>
              {errors.length > 0 && (
                <p className="error">{getFieldError("needRunningWater")}</p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="needRefrigeration">
                <input
                  type="checkbox"
                  name="needRefrigeration"
                  id="needRefrigeration"
                  maxLength={5}
                  onChange={handleCheckboxChange}
                  checked={formData.needRefrigeration ? true : false}
                />
                Refrigeration
              </label>
              {errors.length > 0 && (
                <p className="error">{getFieldError("needRefrigeration")}</p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="needDrinkware">
                <input
                  type="checkbox"
                  name="needDrinkware"
                  id="needDrinkware"
                  maxLength={5}
                  onChange={handleCheckboxChange}
                  checked={formData.needDrinkware ? true : false}
                />
                Disposable Drinkware
              </label>
              {errors.length > 0 && (
                <p className="error">{getFieldError("needDrinkware")}</p>
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
                  onChange={handleCheckboxChange}
                  checked={formData.beer ? true : false}
                />
                Beer
              </label>
              {errors.length > 0 && (
                <p className="error">{getFieldError("beer")}</p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="wine">
                <input
                  type="checkbox"
                  name="wine"
                  id="wine"
                  maxLength={5}
                  onChange={handleCheckboxChange}
                  checked={formData.wine ? true : false}
                />
                Wine
              </label>
              {errors.length > 0 && (
                <p className="error">{getFieldError("wine")}</p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="specialtyDrinks">
                <input
                  type="checkbox"
                  name="specialtyDrinks"
                  id="specialtyDrinks"
                  maxLength={5}
                  onChange={handleCheckboxChange}
                  checked={formData.specialtyDrinks ? true : false}
                />
                Specialty Drinks
              </label>
              {errors.length > 0 && (
                <p className="error">{getFieldError("specialtyDrinks")}</p>
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
                <p className="error">{getFieldError("liquorPreferences")}</p>
              )}
            </div>
          </fieldset>

          <Button type="primary">Signup</Button>
        </form>
      </section>
    );
  }
};
