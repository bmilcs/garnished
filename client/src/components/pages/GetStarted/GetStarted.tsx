import { specialtyDrink08 as backgroundImage } from "@/assets";
import { Button } from "@/components/common/Button/Button";
import { Hero } from "@/components/common/Hero/Hero";
import { LoginForm } from "@/components/common/LoginForm/LoginForm";
import ScrollAnimator from "@/components/common/ScrollAnimator/ScrollAnimator";
import styles from "./GetStarted.module.scss";

export const GetStarted = () => {
  return (
    <>
      <Hero
        backgroundImage={backgroundImage}
        title="Get"
        titleSpan="Started"
        subtitle="Ready to bring your event to the next level?"
        heightInVH={35}
      />

      <section className={`content-spacer ${styles.getStarted}`}>
        <div className={`column content-spacer ${styles.getStartedWrapper}`}>
          <ScrollAnimator type="SLIDE_UP">
            <h2 className={styles.heading}>Here's How It Works</h2>
            <p>Our process is simple:</p>

            <ol className={styles.instructions}>
              <li>Signup for an account</li>
              <li>Fill out a new event form</li>
            </ol>

            <p>
              From there, Garnished's customer service team will review the
              details, craft a personalized estimate and connect with you to
              finalize the details.
            </p>

            <ScrollAnimator
              type="SLIDE_UP"
              delay={0.5}
              className={styles.signupButtonWrapper}
            >
              <Button
                type="hero"
                link="/signup"
                className={styles.signupButton}
              >
                Sign Up Now
              </Button>
            </ScrollAnimator>
          </ScrollAnimator>

          <LoginForm className={styles.loginForm} />
        </div>
      </section>
    </>
  );
};
