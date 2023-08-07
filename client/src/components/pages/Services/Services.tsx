import { Party } from "@/components/common/Party/Party";
import ScrollAnimator from "@/components/common/ScrollAnimator/ScrollAnimator";
import { FC } from "react";
import styles from "./Services.module.scss";

export const Services: FC = () => {
  return (
    <>
      <section className={`column ${styles.services}`}>
        <ScrollAnimator type="SLIDE_RIGHT">
          <h2 className={styles.servicesTitle}>Our Services</h2>
        </ScrollAnimator>

        <div className={styles.servicesWrapper}>
          <ScrollAnimator type="SLIDE_UP" className={styles.service}>
            <h4>Mobile Bar</h4>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione,
              molestias mollitia placeat quisquam sit rem hic, architecto amet
              fugiat consequatur quibusdam vel omnis itaque molestiae!
            </p>
          </ScrollAnimator>

          <ScrollAnimator
            type="SLIDE_UP"
            delay={0.1}
            className={styles.service}
          >
            <h4>Tent</h4>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione,
              molestias mollitia placeat quisquam sit rem hic, architecto amet
              fugiat consequatur quibusdam vel omnis itaque molestiae!
            </p>
          </ScrollAnimator>

          <ScrollAnimator
            type="SLIDE_UP"
            delay={0.2}
            className={styles.service}
          >
            <h4>Bartenders</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus illo cumque temporibus, velit enim, fuga atque ad
              accusantium distinctio itaque neque deleniti tempore, praesentium
              explicabo?
            </p>
          </ScrollAnimator>

          <ScrollAnimator
            type="SLIDE_UP"
            delay={0.3}
            className={styles.service}
          >
            <h4>Barbacks</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus illo cumque temporibus, velit enim, fuga atque ad
              accusantium distinctio itaque neque deleniti tempore, praesentium
              explicabo?
            </p>
          </ScrollAnimator>
        </div>
      </section>

      <section className="column">
        <Party />
      </section>

      <section className={`column ${styles.products}`}>
        <h2 className={styles.productsTitle}>Goods & Products</h2>

        <div className={styles.productsWrapper}>
          <ScrollAnimator type="SLIDE_DOWN" className={styles.product}>
            <h4>Beer</h4>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione,
              molestias mollitia placeat quisquam sit rem hic, architecto amet
              fugiat consequatur quibusdam vel omnis itaque molestiae!
            </p>
          </ScrollAnimator>

          <ScrollAnimator
            type="SLIDE_DOWN"
            delay={0.2}
            className={styles.product}
          >
            <h4>Wine</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus illo cumque temporibus, velit enim, fuga atque ad
              accusantium distinctio itaque neque deleniti tempore, praesentium
              explicabo?
            </p>
          </ScrollAnimator>

          <ScrollAnimator
            type="SLIDE_DOWN"
            delay={0.3}
            className={styles.product}
          >
            <h4>Specialty Drinks</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus illo cumque temporibus, velit enim, fuga atque ad
              accusantium distinctio itaque neque deleniti tempore, praesentium
              explicabo?
            </p>
          </ScrollAnimator>

          <ScrollAnimator
            type="SLIDE_DOWN"
            delay={0.4}
            className={styles.product}
          >
            <h4>Drinkware</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus illo cumque temporibus, velit enim, fuga atque ad
              accusantium distinctio itaque neque deleniti tempore, praesentium
              explicabo?
            </p>
          </ScrollAnimator>

          <ScrollAnimator
            type="SLIDE_DOWN"
            delay={0.5}
            className={styles.product}
          >
            <h4>Ice & Running Water</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus illo cumque temporibus, velit enim, fuga atque ad
              accusantium distinctio itaque neque deleniti tempore, praesentium
              explicabo?
            </p>
          </ScrollAnimator>

          <ScrollAnimator
            type="SLIDE_DOWN"
            delay={0.6}
            className={styles.product}
          >
            <h4>Custom Bar Menu Sign</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus illo cumque temporibus, velit enim, fuga atque ad
              accusantium distinctio itaque neque deleniti tempore, praesentium
              explicabo?
            </p>
          </ScrollAnimator>
        </div>
      </section>
    </>
  );
};
