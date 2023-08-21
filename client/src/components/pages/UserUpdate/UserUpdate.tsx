import { Button } from "@/components/common/Button/Button";
import { HourglassSpinner } from "@/components/common/HourglassSpinner/HourglassSpinner";
import ScrollAnimator from "@/components/common/ScrollAnimator/ScrollAnimator";
import { useInputChange } from "@/hooks/useInputChange";
import { useUserUpdate } from "@/hooks/useUserUpdate";
import { getExpressValidatorError, onFormSubmit } from "@/utils/forms";
import { FC } from "react";

export const UserUpdate: FC = () => {
  const { formData, setFormData, update, errors, isPending } = useUserUpdate();
  const handleSubmitForm = onFormSubmit(update);
  const handleInputChange = useInputChange(setFormData);

  if (isPending) return <HourglassSpinner />;

  if (!isPending && formData)
    return (
      <section className={`content-spacer user-section`}>
        <ScrollAnimator
          type="SLIDE_DOWN"
          className={`column user-section-wrapper`}
        >
          <form onSubmit={handleSubmitForm}>
            <div className="form-header">
              <h2>Update Personal Info</h2>
            </div>

            <div className="input-group">
              <label htmlFor="username">Email Address</label>
              <input
                type="email"
                name="username"
                id="username"
                onChange={handleInputChange}
                value={formData.username}
                required
              />
              {errors.length > 0 && (
                <p className="error">
                  {getExpressValidatorError("username", errors)}
                </p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                onChange={handleInputChange}
                value={formData.phone}
                required
              />
              {errors.length > 0 && (
                <p className="error">
                  {getExpressValidatorError("phone", errors)}
                </p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                onChange={handleInputChange}
                value={formData.firstName}
                required
              />
              {errors.length > 0 && (
                <p className="error">
                  {getExpressValidatorError("firstName", errors)}
                </p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                onChange={handleInputChange}
                value={formData.lastName}
                required
              />
              {errors.length > 0 && (
                <p className="error">
                  {getExpressValidatorError("lastName", errors)}
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
                value={formData.zip}
                required
              />
              {errors.length > 0 && (
                <p className="error">
                  {getExpressValidatorError("zip", errors)}
                </p>
              )}
            </div>

            <Button type="primary">Update Personal Information</Button>
          </form>
        </ScrollAnimator>
      </section>
    );
};
