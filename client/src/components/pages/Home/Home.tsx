import { wine02 } from "@/assets";
import drinkImage8 from "@/assets/specialtyDrink-08.jpg";
import drinkImage7 from "@/assets/specialtyDrink-09.jpg";
import drinkImage6 from "@/assets/specialtyDrink-10.jpg";
import drinkImage3 from "@/assets/specialtyDrink-11.jpg";
import drinkImage4 from "@/assets/specialtyDrink-12.jpg";
import drinkImage5 from "@/assets/specialtyDrink-13.jpg";
import backgroundImage from "@/assets/specialtyDrink-21.jpg";
import { Button } from "@/components/common/Button/Button";
import { CheckMarkIcon } from "@/components/common/CheckMarkIcon/CheckMarkIcon";
import { Hero } from "@/components/common/Hero/Hero";
import { TiltDivider } from "@/components/common/TiltDivider/TiltDivider";
import { FC } from "react";
import styles from "./Home.module.scss";

const sellingPoints = [
  {
    title: "Fully Compliant and Licensed",
    description:
      "We hold a valid liquor permit and have all the necessary general and liquor liability insurance. When you choose Garnished Mobile Bar, you can rest assured that your event is in safe and capable hands.",
  },
  {
    title: "Highly Trained Staff",
    description:
      "Our team is comprised of professionals who are all tip certified. This means that every member of our staff is well-trained in responsible alcohol service, ensuring a safe and enjoyable atmosphere for your guests.",
  },
  {
    title: "Top-notch Hygiene Standards",
    description:
      "At Garnished, we take food safety seriously. Our staff is Serve Safe certified, following best practices from the restaurant world to maintain the highest standards of hygiene while preparing and serving drinks and garnishes.",
  },
  {
    title: "Exquisite Garnishes",
    description:
      "We believe that presentation is key to an unforgettable experience. Our mobile bar comes equipped with an array of fresh garnishes, including lemons and limes, adding a touch of elegance to every beverage we serve.",
  },
  {
    title: "Flexibility to Suit Your Needs",
    description:
      "No two events are the same, and we understand the importance of catering to your unique requirements. Whether it's a corporate function, wedding, or private celebration, we tailor our services to fit seamlessly into your vision.",
  },
  {
    title: "Crafting Custom Menus",
    description:
      "Our skilled mixologists are masters at creating custom drink menus. From signature cocktails to classic favorites, we curate a selection that perfectly complements the theme and style of your event.",
  },
];

const contentBlocks = [
  {
    title: "A Touch of Elegance in Every Sip",
    description:
      "Experience the art of presentation with Garnished's array of fresh garnishes, adding a touch of elegance to every beverage we serve. It's not just a drink; it's an unforgettable work of art.",
    image: drinkImage3,
  },

  {
    title: "Tailored to Your Vision",
    description:
      "At Garnished, we understand the importance of personalization. No matter the occasion, our services are fully flexible to suit your unique needs. From corporate functions to intimate weddings, we seamlessly blend our offerings into your vision.",
    image: drinkImage4,
  },

  {
    title: "A Signature Drink Menu for Your Moment",

    description:
      "Our skilled mixologists are masters at crafting custom drink menus, offering a delightful selection that perfectly complements the theme and style of your event. From signature cocktails to classic favorites, each sip will be a celebration of your moment.",
    image: drinkImage5,
  },

  {
    title: "An Elegant Mobile Bar Set Up - Wherever You Choose",
    description:
      "Garnished brings the bar to you, creating an enchanting ambiance indoors or outdoors, setting the stage for a memorable celebration. Our mobile venue allows you and your guests to savor the moment without compromise.",
    image: drinkImage6,
  },

  {
    title: "Seasonal Menus for Every Occasion",

    description:
      "Celebrate the changing seasons with Garnished's handpicked menus, featuring fresh, vibrant flavors that elevate your event. Embrace the spirit of spring, bask in the colors of summer, savor the essence of fall, and await the delights of winter.",
    image: drinkImage7,
  },

  {
    title: "Craft Your Story with Us",
    description:
      "Garnished invites you to embark on a journey of flavor, elegance, and celebration. Let us craft your story, where every detail, from drinks to garnishes, is meticulously designed to make you feel like an honored guest at your own gala.",
    image: drinkImage8,
  },
];

export const Home: FC = () => {
  return (
    <>
      {/* hero */}

      <Hero
        title="Elevate Your Events With"
        titleSpan="Garnished"
        subtitle="The Premium Mobile Bar Service"
        backgroundImage={backgroundImage}
      >
        <Button className={styles.heroButton} type="hero" link="/get-started">
          Get Started
        </Button>
      </Hero>

      {/* about section */}

      <section className={`column ${styles.aboutSection}`}>
        <div>
          <h3 className={styles.heading}>Premium Mobile Bar</h3>
          <p className={styles.description}>
            Create unforgettable memories with Garnished, New England's premier
            mobile bar service. Whether you're hosting a corporate event, dream
            wedding, or any other celebration, Garnished is here to turn it into
            an extraordinary experience.
          </p>
        </div>

        <div>
          <img src={wine02} className={styles.aboutImage} alt="Drink" />
        </div>
      </section>

      {/* selling points */}

      <TiltDivider />
      <section
        className={`content-spacer-large ${styles.sellingPointsSection}`}
      >
        <div className={`${styles.sellingPoints} column`}>
          <h3 className={styles.sellingPointHeading}>
            What Makes Us Different
          </h3>

          <div className={styles.sellingPointsWrapper}>
            {sellingPoints.map(({ title, description }) => {
              return (
                <div className={styles.sellingPoint} key={title}>
                  <CheckMarkIcon className={styles.checkMark} />
                  <h4 className={styles.subHeading}>{title}</h4>
                  <p className={styles.sellingPointDetails}>{description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <TiltDivider location="BOTTOM" className={styles.bottomDivider} />

      {/* content blocks */}

      {contentBlocks.map(({ title, description, image }, index) => {
        return (
          <section className="column" key={title}>
            <div
              className={
                index % 2 === 0 ? styles.section : styles.sectionReverse
              }
            >
              <div>
                <h3 className={styles.heading}>{title}</h3>
                <p className={styles.description}>{description}</p>
              </div>

              <div>
                <img
                  src={image}
                  className={styles.sectionImage}
                  alt="Specialty Drink"
                />
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};
