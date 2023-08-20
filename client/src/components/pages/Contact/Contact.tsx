import { specialtyDrink04 } from "@/assets";
import { Button } from "@/components/common/Button/Button";
import { Hero } from "@/components/common/Hero/Hero";
import { HourglassSpinner } from "@/components/common/HourglassSpinner/HourglassSpinner";
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
      backgroundImage={specialtyDrink04}
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

              <div className="input-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleInputChange}
                  value={formData.name}
                  required
                />
                {errors.length > 0 && (
                  <p className="error">
                    {getExpressValidatorError("name", errors)}
                  </p>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleInputChange}
                  value={formData.email}
                  required
                />
                {errors.length > 0 && (
                  <p className="error">
                    {getExpressValidatorError("email", errors)}
                  </p>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  onChange={handleInputChange}
                  value={formData.message}
                  rows={5}
                  required
                />
                {errors.length > 0 && (
                  <p className="error">
                    {getExpressValidatorError("message", errors)}
                  </p>
                )}
              </div>

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
