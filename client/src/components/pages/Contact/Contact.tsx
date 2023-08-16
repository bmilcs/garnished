import { specialtyDrink04 } from "@/assets";
import { Button } from "@/components/common/Button/Button";
import { Hero } from "@/components/common/Hero/Hero";
import ScrollAnimator from "@/components/common/ScrollAnimator/ScrollAnimator";
import { getApiEndpoint } from "@/utils/apiConfig";
import { FC, useState } from "react";
import styles from "./Contact.module.scss";

type TContactResponse = {
  errors?: TContactResponseError[];
  msg: string;
};

type TContactResponseError = {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
};

export const Contact: FC = () => {
  const apiBasePath = getApiEndpoint();
  const [errors, setErrors] = useState<TContactResponseError[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // get field error message
  const getFieldError = (fieldName: string) => {
    if (errors.length === 0) return null;
    return errors
      .filter(error => error.path === fieldName)
      .map(error => error.msg)[0];
  };

  const submitContactForm = async () => {
    // clear errors
    setErrors([]);

    const url = `${apiBasePath}/contact/`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = (await res.json()) as TContactResponse;

      if (data.errors) {
        setErrors(data.errors);
        return;
      }

      alert("Sent!");
    } catch (e) {
      console.error("errors:", e);
    }
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitContactForm().catch(e => console.error("signup error:", e));
  };

  return (
    <>
      <Hero
        backgroundImage={specialtyDrink04}
        title="Get In"
        titleSpan="Touch"
        subtitle="We're excited to hear from you!"
        heightInVH={35}
      />

      <section className={`${styles.contact}`}>
        <div className={`column content-spacer ${styles.contactWrapper}`}>
          <ScrollAnimator
            type="SLIDE_DOWN"
            delay={0.2}
            className={` ${styles.contactLeftColumn}`}
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
                  onChange={e => setName(e.target.value)}
                  value={name}
                  required
                />
                {errors.length > 0 && (
                  <p className="error">{getFieldError("name")}</p>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  required
                />
                {errors.length > 0 && (
                  <p className="error">{getFieldError("email")}</p>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  onChange={e => setMessage(e.target.value)}
                  value={message}
                  rows={5}
                  required
                />
                {errors.length > 0 && (
                  <p className="error">{getFieldError("message")}</p>
                )}
              </div>

              <Button type="primary" onClick={submitContactForm}>
                Send Message
              </Button>
            </form>
          </ScrollAnimator>
        </div>
      </section>
    </>
  );
};
