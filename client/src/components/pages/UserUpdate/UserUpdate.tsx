import AnimatedDiv from "@/components/common/AnimatedDiv/AnimatedDiv";
import { Button } from "@/components/common/Button/Button";
import { HourglassSpinner } from "@/components/common/HourglassSpinner/HourglassSpinner";
import { Input } from "@/components/common/Input/Input";
import { Modal } from "@/components/common/Modal/Modal";
import { ErrorPage } from "@/components/pages/ErrorPage/ErrorPage";
import { useInputChange } from "@/hooks/useInputChange";
import { useUserUpdate } from "@/hooks/useUserUpdate";
import { getExpressValidatorError, onFormSubmit } from "@/utils/forms";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserUpdate: FC = () => {
  const {
    formData,
    setFormData,
    updateUser,
    deleteUser,
    updateErrors,
    deleteError,
    isPending,
  } = useUserUpdate();
  const handleSubmitForm = onFormSubmit(updateUser);
  const handleInputChange = useInputChange(setFormData);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  if (isPending) {
    return <HourglassSpinner />;
  }

  if (!isPending && !formData) {
    return <ErrorPage title="404" subtitle="User not found." />;
  }

  if (!isPending && formData)
    return (
      <section className={`content-spacer user-section`}>
        <AnimatedDiv type="SLIDE_DOWN" className="column user-section-wrapper">
          <form onSubmit={handleSubmitForm}>
            <div className="form-header">
              <h1 className="h2">Update Personal Info</h1>
            </div>

            <Input
              name="username"
              type="email"
              label="Email Address"
              onChange={handleInputChange}
              value={formData.username}
              required
              error={getExpressValidatorError("username", updateErrors)}
            />

            <Input
              name="phone"
              type="text"
              label="Phone"
              onChange={handleInputChange}
              value={formData.phone}
              required
              error={getExpressValidatorError("phone", updateErrors)}
            />

            <Input
              name="firstName"
              type="text"
              label="First Name"
              onChange={handleInputChange}
              value={formData.firstName}
              required
              error={getExpressValidatorError("firstName", updateErrors)}
            />

            <Input
              name="lastName"
              type="text"
              label="Last Name"
              onChange={handleInputChange}
              value={formData.lastName}
              required
              error={getExpressValidatorError("lastName", updateErrors)}
            />

            <Input
              name="address"
              type="text"
              label="Address"
              onChange={handleInputChange}
              value={formData.address}
              required
              error={getExpressValidatorError("address", updateErrors)}
            />

            <Input
              name="city"
              type="text"
              label="City"
              onChange={handleInputChange}
              value={formData.city}
              required
              error={getExpressValidatorError("city", updateErrors)}
            />

            <Input
              name="state"
              type="text"
              label="State"
              onChange={handleInputChange}
              value={formData.state}
              required
              maxLength={2}
              error={getExpressValidatorError("state", updateErrors)}
            />

            <Input
              name="zip"
              type="text"
              label="Zip Code"
              onChange={handleInputChange}
              value={formData.zip}
              required
              maxLength={5}
              error={getExpressValidatorError("zip", updateErrors)}
            />

            <Button type="primary">Update Personal Information</Button>
          </form>
        </AnimatedDiv>

        <AnimatedDiv type="SLIDE_UP" delay={0.4} className="button-wrapper">
          <Button type="outline" onClick={() => setShowDeleteModal(true)}>
            Delete Account
          </Button>
        </AnimatedDiv>

        {showDeleteModal && !deleteError && (
          <Modal
            title="Delete Your Account?"
            message="Are you sure you want to delete your account? This action cannot be undone."
          >
            <div className="button-wrapper">
              <Button
                type="outline"
                onClick={deleteUser}
                className="margin-right"
              >
                Delete Account
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

        {deleteError && (
          <Modal
            title="Error"
            message={deleteError}
            onClickCloseOrOverlay={() => navigate("/user")}
          >
            <Button type="primary" onClick={() => navigate("/user")}>
              Return to Dashboard
            </Button>
          </Modal>
        )}
      </section>
    );
};
