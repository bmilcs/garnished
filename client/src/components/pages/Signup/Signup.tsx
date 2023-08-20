import { Button } from "@/components/common/Button/Button";
import { HourglassSpinner } from "@/components/common/HourglassSpinner/HourglassSpinner";
import ScrollAnimator from "@/components/common/ScrollAnimator/ScrollAnimator";
import { useInputChange } from "@/hooks/useInputChange";
import { useUserSignup } from "@/hooks/useUserSignup";
import { getExpressValidatorError, onFormSubmit } from "@/utils/forms";
import { FC } from "react";
import { Link } from "react-router-dom";

export const Signup: FC = () => {
  const { formData, setFormData, signup, errors, isPending } = useUserSignup();
  const handleSubmitForm = onFormSubmit(signup);
  const handleInputChange = useInputChange(setFormData);

  if (isPending) return <HourglassSpinner />;

  if (!isPending)
    return (
      <section className={`content-spacer user-section`}>
        <ScrollAnimator
          type="SLIDE_DOWN"
          className={`column user-section-wrapper`}
        >
          <form onSubmit={handleSubmitForm}>
            <div className="form-header">
              <h2>Signup</h2>
              <p>
                Already have an account? <Link to="/login">Login here.</Link>
              </p>
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
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleInputChange}
                value={formData.password}
                required
              />
              {errors.length > 0 && (
                <p className="error">
                  {getExpressValidatorError("password", errors)}
                </p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                onChange={handleInputChange}
                value={formData.confirmPassword}
                required
              />
              {errors.length > 0 && (
                <p className="error">
                  {getExpressValidatorError("confirmPassword", errors)}
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

            <Button type="primary">Signup</Button>
          </form>
        </ScrollAnimator>
      </section>
    );
};
