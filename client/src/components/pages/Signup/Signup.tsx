import AnimatedDiv from "@/components/common/AnimatedDiv/AnimatedDiv";
import { Button } from "@/components/common/Button/Button";
import { HourglassSpinner } from "@/components/common/HourglassSpinner/HourglassSpinner";
import { Input } from "@/components/common/Input/Input";
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
        <AnimatedDiv
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

            <Input
              name="username"
              type="email"
              label="Email Address"
              onChange={handleInputChange}
              value={formData.username}
              required
              error={getExpressValidatorError("username", errors)}
            />

            <Input
              name="password"
              type="password"
              label="Password"
              onChange={handleInputChange}
              value={formData.password}
              required
              error={getExpressValidatorError("password", errors)}
            />

            <Input
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              onChange={handleInputChange}
              value={formData.confirmPassword}
              required
              error={getExpressValidatorError("confirmPassword", errors)}
            />

            <Input
              name="phone"
              type="text"
              label="Phone"
              onChange={handleInputChange}
              value={formData.phone}
              required
              error={getExpressValidatorError("phone", errors)}
            />

            <Input
              name="firstName"
              type="text"
              label="First Name"
              onChange={handleInputChange}
              value={formData.firstName}
              required
              error={getExpressValidatorError("firstName", errors)}
            />

            <Input
              name="lastName"
              type="text"
              label="Last Name"
              onChange={handleInputChange}
              value={formData.lastName}
              required
              error={getExpressValidatorError("lastName", errors)}
            />

            <Input
              name="address"
              type="text"
              label="Address"
              onChange={handleInputChange}
              value={formData.address}
              required
              error={getExpressValidatorError("address", errors)}
            />

            <Input
              name="city"
              type="text"
              label="City"
              onChange={handleInputChange}
              value={formData.city}
              required
              error={getExpressValidatorError("city", errors)}
            />

            <Input
              name="state"
              type="text"
              label="State"
              onChange={handleInputChange}
              value={formData.state}
              required
              maxLength={2}
              error={getExpressValidatorError("state", errors)}
            />

            <Input
              name="zip"
              type="text"
              label="Zip Code"
              onChange={handleInputChange}
              value={formData.zip}
              required
              maxLength={5}
              error={getExpressValidatorError("zip", errors)}
            />

            <Button type="primary">Signup</Button>
          </form>
        </AnimatedDiv>
      </section>
    );
};
