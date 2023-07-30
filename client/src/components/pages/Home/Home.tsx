import backgroundImage from "@/assets/specialtyDrink-19.jpg";
import drinkImage from "@/assets/specialtyDrink-20.jpg";
import { Button } from "@/components/common/Button/Button";
import { CheckMark } from "@/components/common/CheckMark/CheckMark";
import { FC } from "react";
import styles from "./Home.module.scss";

export const Home: FC = () => {
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
        "At Garnished, we take food safety seriously. Our staff is Serve Safe certified, following best practices from the restaurant world to maintain the highest standards of hygiene while preparing and serving food and garnishes.",
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

  return (
    <section className={styles.home}>
      <div>
        <div
          className={styles.hero}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className={styles.heroContent}>
            <div className={styles.heroWrapper}>
              <h2 className={styles.title}>Garnished</h2>
              <p className={styles.subtitle}>The Premium Mobile Bar Service</p>
              <Button type="hero" link="/signup">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.about} column`}>
        <h3 className={styles.heading}>About Us</h3>
        <p className={styles.description}>
          Welcome to Garnished LLC, your premier mobile bar service offering a
          truly unforgettable experience for your events. We take great pride in
          catering to your individual needs and providing exceptional services
          for various occasions across New England.
        </p>
      </div>

      <img
        src={drinkImage}
        className={styles.drinkImage}
        alt="Specialty Drink"
      />

      <div className={`${styles.sellingPoints} column`}>
        <h3 className={styles.heading}>What Makes Us Different</h3>

        {sellingPoints.map(({ title, description }) => {
          return (
            <div className={styles.sellingPoint} key={title}>
              <CheckMark className={styles.checkMark} />
              <h4 className={styles.subHeading}>{title}</h4>
              <p className={styles.sellingPointDetails}>{description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
