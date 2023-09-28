import { bar, drinks } from "@/assets";
import AnimatedDiv from "@/components/common/AnimatedDiv/AnimatedDiv";
import { Hero } from "@/components/common/Hero/Hero";
import { PageTransition } from "@/components/common/PageTransition/PageTransition";
import { ResponsiveImage } from "@/components/common/ResponsiveImage/ResponsiveImage";
import { WavySeparator } from "@/components/common/WavySeparator/WavySeparator";
import { FC } from "react";
import styles from "./Services.module.scss";

export const Services: FC = () => {
  return (
    <PageTransition>
      <Hero
        title="Goods &"
        titleSpan="Services"
        subtitle="We bring the party to you"
        backgroundImage={drinks.specialty_drink_13.full}
      />

      <section className={`column ${styles.mobileBar}`}>
        <AnimatedDiv type="SLIDE_RIGHT" delay={0.5}>
          <div className={styles.mobileBarContent}>
            <h3 className={styles.mobileBarTitle}>The Mobile Bar</h3>
            <p className={styles.mobileBarDescription}>
              The heart of our business is our mobile bar. We bring the bar to
              you and your guests, ensuring a seamless and delightful drinking
              experience at your event. Our mobile bar setup is designed to add
              a touch of elegance and convenience to any occasion.
            </p>
          </div>
        </AnimatedDiv>

        <AnimatedDiv type="FADE_GROW_IN" delay={0.7}>
          <ResponsiveImage
            img={bar.bar_display_01}
            className={styles.mobileBarImage}
            alt="Mobile Bar"
          />
        </AnimatedDiv>
      </section>

      <WavySeparator location="TOP" />

      <section className={styles.services}>
        <div className={`column ${styles.servicesWrapper}`}>
          <div className={styles.service}>
            <h3 className={styles.serviceTitle}>Bartenders</h3>
            <p className={styles.serviceDescription}>
              Our team of bartenders consists of certified professionals with
              years of experience. They are not just skilled mixologists but
              also friendly and attentive, making sure your guests have a
              memorable and enjoyable time while sipping their favorite drinks.
            </p>
          </div>

          <div className={styles.service}>
            <h3 className={styles.serviceTitle}>Barbacks</h3>
            <p className={styles.serviceDescription}>
              Supporting our bartenders are our certified barbacks. With years
              of experience under their belts, our barbacks are essential in
              keeping the bar area well-stocked, organized, and running
              smoothly. They work behind the scenes to ensure that every aspect
              of your event's bar service is flawless.
            </p>
          </div>

          <div className={styles.service}>
            <h3 className={styles.serviceTitle}>Tent</h3>
            <p className={styles.serviceDescription}>
              For outdoor events, we offer a 10x10 tent that covers the bar
              area. This provision ensures that your bar area remains
              comfortable and protected from the elements, allowing your guests
              to enjoy their drinks without worrying about the weather.
            </p>
          </div>
        </div>
      </section>

      <WavySeparator location="BOTTOM" />

      <section className={`column ${styles.products}`}>
        <div>
          <ResponsiveImage
            img={bar.bar_server_02}
            className={styles.serverImage}
            alt="Server"
          />
        </div>

        <div className={styles.productsHeader}>
          <h2 className={styles.productsTitle}>Thirsty?</h2>
          <p className={styles.productsSubtitle}>We have you covered.</p>
        </div>

        <div className={styles.productsWrapper}>
          <div className={styles.product}>
            <h3 className={styles.serviceTitle}>Beer</h3>
            <p className={styles.serviceDescription}>
              Indulge in a variety of carefully selected beers that cater to
              different preferences. From rich and hoppy IPAs to crisp and
              refreshing lagers, our beer selection is sure to satisfy even the
              most discerning beer enthusiasts. Enjoy the perfect complement to
              your event's atmosphere.
            </p>
          </div>

          <div className={styles.product}>
            <h3 className={styles.serviceTitle}>Wine</h3>
            <p className={styles.serviceDescription}>
              Elevate your event with a curated selection of wines that are sure
              to tantalize your taste buds. Our wines are chosen to offer a
              range of flavors, from elegant reds to delicate whites, ensuring
              that there's a wine to suit every palate and occasion.
            </p>
          </div>

          <div className={styles.product}>
            <h3 className={styles.serviceTitle}>Specialty Drinks</h3>
            <p className={styles.serviceDescription}>
              Experience the artistry of mixology with our specialty drinks.
              Crafted with precision and creativity, these signature concoctions
              are designed to surprise and delight your guests. Whether it's a
              classic cocktail with a twist or an entirely unique creation, our
              specialty drinks are the epitome of a refined drinking experience.
            </p>
          </div>

          <div className={styles.product}>
            <h3 className={styles.serviceTitle}>Drinkware</h3>
            <p className={styles.serviceDescription}>
              To enhance your guests' experience, we provide a wide range of
              high-quality drinkware. From elegant glassware to durable and
              eco-friendly options, our selection ensures that your guests enjoy
              their beverages in style, while also being considerate of the
              environment.
            </p>
          </div>

          <div className={styles.product}>
            <h3 className={styles.serviceTitle}>Ice & Running Water</h3>
            <p className={styles.serviceDescription}>
              The foundation of any great drink is quality ingredients, and that
              includes ice and running water. We ensure that your drinks stay
              perfectly chilled and that our bartenders have access to the
              resources they need to create the perfect cocktails that your
              guests will savor.
            </p>
          </div>

          <div className={styles.product}>
            <h3 className={styles.serviceTitle}>Custom Bar Menu Sign</h3>
            <p className={styles.serviceDescription}>
              Add a personal touch to your event with a custom bar menu sign.
              This sign not only showcases the drink offerings but also
              complements your event's theme and aesthetics. It's a stylish and
              informative addition that helps guests explore the drink options
              available and make their choices confidently.
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
