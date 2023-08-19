import ScrollAnimator from "@/components/common/ScrollAnimator/ScrollAnimator";
import styles from "./HourglassSpinner.module.scss";

export const HourglassSpinner = () => {
  return (
    <section className={`content-spacer user-section`}>
      <ScrollAnimator className={styles.loading}>
        <div>
          <h3>Loading...</h3>
          <p>Please wait.</p>
        </div>
      </ScrollAnimator>
    </section>
  );
};
