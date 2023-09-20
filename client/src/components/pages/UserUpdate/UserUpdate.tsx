import { Button } from "@/components/common/Button/Button";
import { HourglassSpinner } from "@/components/common/HourglassSpinner/HourglassSpinner";
import { Input } from "@/components/common/Input/Input";
import { useInputChange } from "@/hooks/useInputChange";
import { useUserUpdate } from "@/hooks/useUserUpdate";
import { getExpressValidatorError, onFormSubmit } from "@/utils/forms";
import { FC } from "react";

export const UserUpdate: FC = () => {
  const { formData, setFormData, updateUser, deleteUser, errors, isPending } =
    useUserUpdate();
  const handleSubmitForm = onFormSubmit(updateUser);
  const handleInputChange = useInputChange(setFormData);

  if (isPending) return <HourglassSpinner />;

  if (!isPending && formData)
    return (
      <section className={`content-spacer user-section`}>
        <div className={`column user-section-wrapper`}>
          <form onSubmit={handleSubmitForm}>
            <div className="form-header">
              <h2>Update Personal Info</h2>
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

            <Button type="primary">Update Personal Information</Button>
          </form>
        </div>

        <Button type="outline" onClick={deleteUser}>
          Delete Account
        </Button>
      </section>
    );
};
