import { drinks } from "@/assets";
import { Button } from "@/components/common/Button/Button";
import { Hero } from "@/components/common/Hero/Hero";
import { HourglassSpinner } from "@/components/common/HourglassSpinner/HourglassSpinner";
import { Input } from "@/components/common/Input/Input";
import ScrollAnimator from "@/components/common/ScrollAnimator/ScrollAnimator";
import { useContactForm } from "@/hooks/useContactForm";
import { useInputChange } from "@/hooks/useInputChange";
import { getExpressValidatorError, onFormSubmit } from "@/utils/forms";
import { FC } from "react";
import styles from "./Contact.module.scss";

//
// hero section
//

const ContactHero: FC = () => {
  return (
    <Hero
      backgroundImage={drinks.specialty_drink_30.full}
      title="Get In"
      titleSpan="Touch"
      subtitle="We're excited to hear from you!"
      heightInVH={35}
    />
  );
};

//
// contact page
//

export const Contact: FC = () => {
  const { formData, setFormData, submitContactForm, errors, isPending } =
    useContactForm();
  const handleInputChange = useInputChange(setFormData);
  const handleSubmitForm = onFormSubmit(submitContactForm);

  if (isPending)
    return (
      <>
        <ContactHero />
        <HourglassSpinner />
      </>
    );

  return (
    <>
      <ContactHero />

      <section className={`${styles.contact}`}>
        <div className={`column content-spacer ${styles.contactWrapper}`}>
          <ScrollAnimator
            type="SLIDE_DOWN"
            delay={0.2}
            className={`${styles.contactLeftColumn}`}
          >
            <div>
              <h2 className={styles.contactHeader}>Wait...</h2>
              <p className={styles.contactInstructions}>
                Are you ready for your free estimate? If so, click get started
                and follow the instructions. Otherwise, fill out the form and
                we'll get back to you as soon as possible.
              </p>

              <Button type="hero" link="/get-started">
                Get Started
              </Button>
            </div>
          </ScrollAnimator>

          <ScrollAnimator type="SLIDE_UP" delay={0.4}>
            <form onSubmit={handleSubmitForm} className={styles.form}>
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
          </ScrollAnimator>
        </div>

        {/* <Modal
          type="info"
          navigateTo="/get-started"
          title="Thank You!"
          message="We'll review your message and get back to you as soon as possible."
        /> */}
      </section>
    </>
  );
};
