import { Button } from "@/components/common/Button/Button";
import { HourglassSpinner } from "@/components/common/HourglassSpinner/HourglassSpinner";
import ScrollAnimator from "@/components/common/ScrollAnimator/ScrollAnimator";
import { useUserSignup } from "@/hooks/useUserSignup";
import { FC } from "react";
import { Link } from "react-router-dom";

export const Signup: FC = () => {
  const { formData, setFormData, signup, errors, isPending } = useUserSignup();

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void signup();
  };

  // update formData state on input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // get field error message for a field from errors array,
  // which is in express - validator format
  const getFieldError = (fieldName: string) => {
    if (errors.length === 0) return null;
    console.log(errors);
    return errors
      .filter(error => error.path === fieldName)
      .map(error => error.msg)[0];
  };

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
                <p className="error">{getFieldError("username")}</p>
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
                <p className="error">{getFieldError("password")}</p>
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
                <p className="error">{getFieldError("confirmPassword")}</p>
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
                <p className="error">{getFieldError("phone")}</p>
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
                <p className="error">{getFieldError("firstName")}</p>
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
                <p className="error">{getFieldError("lastName")}</p>
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
                value={formData.zip}
                required
              />
              {errors.length > 0 && (
                <p className="error">{getFieldError("zip")}</p>
              )}
            </div>

            <Button type="primary">Signup</Button>
          </form>
        </ScrollAnimator>
      </section>
    );
};
