import { drinks } from "@/assets";
import AnimatedDiv from "@/components/common/AnimatedDiv/AnimatedDiv";
import { ArrowNavigation } from "@/components/common/ArrowNavigation/ArrowNavigation";
import { Button } from "@/components/common/Button/Button";
import { GetStartedButton } from "@/components/common/GetStartedButton/GetStartedButton";
import { Hero } from "@/components/common/Hero/Hero";
import { HourglassSpinner } from "@/components/common/HourglassSpinner/HourglassSpinner";
import { Input } from "@/components/common/Input/Input";
import { Modal } from "@/components/common/Modal/Modal";
import { useContactForm } from "@/hooks/useContactForm";
import { useInputChange } from "@/hooks/useInputChange";
import { getExpressValidatorError, onFormSubmit } from "@/utils/forms";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Contact.module.scss";

//
// contact page
//

export const Contact: FC = () => {
  const {
    formData,
    setFormData,
    submitContactForm,
    errors,
    isSent,
    isPending,
  } = useContactForm();
  const handleInputChange = useInputChange(setFormData);
  const handleSubmitForm = onFormSubmit(submitContactForm);
  const navigate = useNavigate();

  return (
    <>
      <Hero
        backgroundImage={drinks.specialty_drink_30}
        title="Get In"
        titleSpan="Touch"
        subtitle="We're excited to hear from you!"
        heightInVH={35}
      />

      <section className={`${styles.contact}`}>
        {/* pending status: waiting on contact form request to complete */}
        {isPending && <HourglassSpinner />}

        {/* not pending: render contact form */}
        {!isPending && (
          <div className={`column content-spacer ${styles.contactWrapper}`}>
            <AnimatedDiv
              type="SLIDE_DOWN"
              delay={0.2}
              className={`${styles.contactLeftColumn}`}
            >
              <div className={styles.waitContent}>
                <h2 className={styles.contactHeader}>Wait...</h2>
                <p className={styles.contactInstructions}>
                  Are you ready for your free estimate? If so, click to get
                  started and follow the instructions. Otherwise, fill out the
                  contact form and we'll get back to you as soon as possible.
                </p>

                <GetStartedButton />
              </div>
            </AnimatedDiv>

            <AnimatedDiv type="SLIDE_UP" delay={0.4}>
              <form onSubmit={handleSubmitForm}>
                <div className="form-header">
                  <h3>Let's Chat</h3>
                  <p>Feedback? Questions? We want to hear from you.</p>
                </div>

                <Input
                  name="name"
                  type="text"
                  label="Name"
                  onChange={handleInputChange}
                  value={formData.name}
                  required
                  error={getExpressValidatorError("name", errors)}
                />

                <Input
                  name="email"
                  type="email"
                  label="Email"
                  onChange={handleInputChange}
                  value={formData.email}
                  required
                  error={getExpressValidatorError("email", errors)}
                />

                <Input
                  name="message"
                  type="textarea"
                  label="Message"
                  onChange={handleInputChange}
                  value={formData.message}
                  required
                  error={getExpressValidatorError("message", errors)}
                  rows={6}
                />

                <Button type="primary" onClick={submitContactForm}>
                  Send Message
                </Button>
              </form>
            </AnimatedDiv>
          </div>
        )}

        {/* modal: success status, contact form request was successful */}

        {isSent && (
          <Modal
            type="standard"
            title="Thank You!"
            message="We'll review your message and get back to you as soon as possible."
            onClickCloseOrOverlay={() => navigate("/")}
          >
            <Button type="primary" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </Modal>
        )}

        <ArrowNavigation
          type="NEXT_AND_PREVIOUS_PAGES"
          nextPageUrl="/get-started"
          nextPageLabel="Get Started"
          previousPageLabel="Gallery"
          previousPageUrl="/gallery"
        />
      </section>
    </>
  );
};
