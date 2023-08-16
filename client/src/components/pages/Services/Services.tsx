import backgroundImage from "@/assets/margarita-tray.png";
import serverImg from "@/assets/server.jpg";
import { Hero } from "@/components/common/Hero/Hero";
import { PartySVG } from "@/components/common/PartySVG/PartySVG";
import ScrollAnimator from "@/components/common/ScrollAnimator/ScrollAnimator";
import { WavySeparator } from "@/components/common/WavySeparator/WavySeparator";
import { FC } from "react";
import styles from "./Services.module.scss";

export const Services: FC = () => {
  return (
    <>
      <Hero
        title="Goods &"
        titleSpan="Services"
        subtitle="We bring the party to you"
        backgroundImage={backgroundImage}
      />

      <section className={`column ${styles.mobileBar}`}>
        <ScrollAnimator type="SLIDE_RIGHT" delay={0.5}>
          <div className={styles.mobileBarContent}>
            <h3 className={styles.mobileBarTitle}>The Mobile Bar</h3>
            <p className={styles.mobileBarDescription}>
              The heart of our business is our mobile bar. We bring the bar to
              you and your guests, ensuring a seamless and delightful drinking
              experience at your event. Our mobile bar setup is designed to add
              a touch of elegance and convenience to any occasion.
            </p>
          </div>
        </ScrollAnimator>

        <ScrollAnimator type="FADE_GROW_IN" delay={0.7}>
          <PartySVG className={styles.partySVG} />
        </ScrollAnimator>
      </section>

      <WavySeparator location="TOP" />

      <section className={styles.services}>
        <div className={`column ${styles.servicesWrapper}`}>
          <ScrollAnimator
            type="SLIDE_UP"
            delay={0.3}
            className={styles.service}
          >
            <h4 className={styles.serviceTitle}>Bartenders</h4>
            <p className={styles.serviceDescription}>
              Our team of bartenders consists of certified professionals with
              years of experience. They are not just skilled mixologists but
              also friendly and attentive, making sure your guests have a
              memorable and enjoyable time while sipping their favorite drinks.
            </p>
          </ScrollAnimator>

          <ScrollAnimator
            type="SLIDE_UP"
            delay={0.2}
            className={styles.service}
          >
            <h4 className={styles.serviceTitle}>Barbacks</h4>
            <p className={styles.serviceDescription}>
              Supporting our bartenders are our certified barbacks. With years
              of experience under their belts, our barbacks are essential in
              keeping the bar area well-stocked, organized, and running
              smoothly. They work behind the scenes to ensure that every aspect
              of your event's bar service is flawless.
            </p>
          </ScrollAnimator>

          <ScrollAnimator
            type="SLIDE_UP"
            delay={0.1}
            className={styles.service}
          >
            <h4 className={styles.serviceTitle}>Tent</h4>
            <p className={styles.serviceDescription}>
              For outdoor events, we offer a 10x10 tent that covers the bar
              area. This provision ensures that your bar area remains
              comfortable and protected from the elements, allowing your guests
              to enjoy their drinks without worrying about the weather.
            </p>
          </ScrollAnimator>
        </div>
      </section>

      <WavySeparator location="BOTTOM" />

      <section className={`column ${styles.products}`}>
        <ScrollAnimator type="SLIDE_UP">
          <img
            src={serverImg}
            className={styles.serverImage}
            alt="mobile bar"
          />
        </ScrollAnimator>

        <ScrollAnimator className={styles.productsHeader}>
          <h2 className={styles.productsTitle}>Thirsty?</h2>
          <p className={styles.productsSubtitle}>We have you covered.</p>
        </ScrollAnimator>

        <div className={styles.productsWrapper}>
          <ScrollAnimator type="SLIDE_DOWN" className={styles.product}>
            <h4 className={styles.serviceTitle}>Beer</h4>
            <p className={styles.serviceDescription}>
              Indulge in a variety of carefully selected beers that cater to
              different preferences. From rich and hoppy IPAs to crisp and
              refreshing lagers, our beer selection is sure to satisfy even the
              most discerning beer enthusiasts. Enjoy the perfect complement to
              your event's atmosphere.
            </p>
          </ScrollAnimator>

          <ScrollAnimator
            type="SLIDE_DOWN"
            delay={0.2}
            className={styles.product}
          >
            <h4 className={styles.serviceTitle}>Wine</h4>
            <p className={styles.serviceDescription}>
              Elevate your event with a curated selection of wines that are sure
              to tantalize your taste buds. Our wines are chosen to offer a
              range of flavors, from elegant reds to delicate whites, ensuring
              that there's a wine to suit every palate and occasion.
            </p>
          </ScrollAnimator>

          <ScrollAnimator
            type="SLIDE_DOWN"
            delay={0.3}
            className={styles.product}
          >
            <h4 className={styles.serviceTitle}>Specialty Drinks</h4>
            <p className={styles.serviceDescription}>
              Experience the artistry of mixology with our specialty drinks.
              Crafted with precision and creativity, these signature concoctions
              are designed to surprise and delight your guests. Whether it's a
              classic cocktail with a twist or an entirely unique creation, our
              specialty drinks are the epitome of a refined drinking experience.
            </p>
          </ScrollAnimator>

          <ScrollAnimator
            type="SLIDE_DOWN"
            delay={0.4}
            className={styles.product}
          >
            <h4 className={styles.serviceTitle}>Drinkware</h4>
            <p className={styles.serviceDescription}>
              To enhance your guests' experience, we provide a wide range of
              high-quality drinkware. From elegant glassware to durable and
              eco-friendly options, our selection ensures that your guests enjoy
              their beverages in style, while also being considerate of the
              environment.
            </p>
          </ScrollAnimator>

          <ScrollAnimator
            type="SLIDE_DOWN"
            delay={0.5}
            className={styles.product}
          >
            <h4 className={styles.serviceTitle}>Ice & Running Water</h4>
            <p className={styles.serviceDescription}>
              The foundation of any great drink is quality ingredients, and that
              includes ice and running water. We ensure that your drinks stay
              perfectly chilled and that our bartenders have access to the
              resources they need to create the perfect cocktails that your
              guests will savor.
            </p>
          </ScrollAnimator>

          <ScrollAnimator
            type="SLIDE_DOWN"
            delay={0.6}
            className={styles.product}
          >
            <h4 className={styles.serviceTitle}>Custom Bar Menu Sign</h4>
            <p className={styles.serviceDescription}>
              Add a personal touch to your event with a custom bar menu sign.
              This sign not only showcases the drink offerings but also
              complements your event's theme and aesthetics. It's a stylish and
              informative addition that helps guests explore the drink options
              available and make their choices confidently.
            </p>
          </ScrollAnimator>
        </div>
      </section>
    </>
  );
};
