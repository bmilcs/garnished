import { drinks } from "@/assets";
import { Button } from "@/components/common/Button/Button";
import { Hero } from "@/components/common/Hero/Hero";
import { LoginForm } from "@/components/common/LoginForm/LoginForm";
import { PageTransition } from "@/components/common/PageTransition/PageTransition";
import ScrollAnimator from "@/components/common/ScrollAnimator/ScrollAnimator";
import { AuthContext } from "@/hooks/useAuthContext";
import { FC, useContext, useEffect } from "react";
import styles from "./GetStarted.module.scss";

export const GetStarted: FC = () => {
  const { isLoggedIn, redirectAuthorizedUser } = useContext(AuthContext);

  useEffect(() => {
    redirectAuthorizedUser();
  }, [redirectAuthorizedUser]);

  if (!isLoggedIn)
    return (
      <PageTransition>
        <Hero
          backgroundImage={drinks.specialty_drink_52.full}
          title="Get"
          titleSpan="Started"
          subtitle="Ready to bring your event to the next level?"
          heightInVH={35}
        />

        <section className={`content-spacer ${styles.getStarted}`}>
          <div className={`column ${styles.getStartedWrapper}`}>
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
      </PageTransition>
    );
};
