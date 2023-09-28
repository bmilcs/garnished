import AnimatedDiv from "@/components/common/AnimatedDiv/AnimatedDiv";
import styles from "./HourglassSpinner.module.scss";

export const HourglassSpinner = () => {
  return (
    <section className={`content-spacer user-section`}>
      <AnimatedDiv className={styles.loading}>
        <div>
          <h3>Loading...</h3>
          <p>Please wait.</p>
        </div>
      </AnimatedDiv>
    </section>
  );
};
