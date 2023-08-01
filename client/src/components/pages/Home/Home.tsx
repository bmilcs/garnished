import drinkImage from "@/assets/specialtyDrink-03.jpg";
import drinkImage2 from "@/assets/specialtyDrink-10.jpg";
import drinkImage3 from "@/assets/specialtyDrink-11.jpg";
import drinkImage4 from "@/assets/specialtyDrink-12.jpg";
import drinkImage5 from "@/assets/specialtyDrink-13.jpg";
import drinkImage6 from "@/assets/specialtyDrink-14.jpg";
import drinkImage7 from "@/assets/specialtyDrink-15.jpg";
import drinkImage8 from "@/assets/specialtyDrink-16.jpg";
import drinkImage9 from "@/assets/specialtyDrink-17.jpg";
import drinkImage10 from "@/assets/specialtyDrink-18.jpg";
import backgroundImage from "@/assets/specialtyDrink-21.jpg";
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
    <>
      <section>
        <div
          className={styles.hero}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className={styles.heroOverlay}>
            <div className={styles.heroWrapper}>
              <h2 className={styles.title}>Garnished</h2>
              <p className={styles.subtitle}>The Premium Mobile Bar Service</p>
              <Button type="hero" link="/signup">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="column">
        <div className={`${styles.about}`}>
          <h3 className={styles.heading}>Elevate Your Events with Garnished</h3>
          <p className={styles.description}>
            Create unforgettable memories with Garnished, New England's premier
            mobile bar service. Whether you're hosting a corporate event, dream
            wedding, or any other celebration, Garnished is here to turn it into
            an extraordinary experience.
          </p>
        </div>
        <img
          src={drinkImage}
          className={styles.drinkImage}
          alt="Specialty Drink"
        />
      </section>

      <section className="column">
        <div className={`${styles.sellingPoints} `}>
          <h3 className={styles.heading}>What Makes Us Different</h3>
          <div className={styles.sellingPointsWrapper}>
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
        </div>
      </section>

      <section className="column alternativeBg">
        <div className={styles.section}>
          <div className={`${styles.sectionContent}`}>
            <h3 className={styles.heading}>
              Crafting Exquisite Drinks and Memories
            </h3>
            <p className={styles.description}>
              Garnished goes beyond the ordinary to ensure your event is
              exceptional. Our fully compliant and licensed service offers peace
              of mind, knowing your guests are in safe hands. With highly
              trained staff certified in responsible alcohol service, your
              guests will enjoy a secure and enjoyable atmosphere.
            </p>
          </div>
          <img
            src={drinkImage2}
            className={styles.sectionImage}
            alt="Specialty Drink"
          />
        </div>
      </section>

      <section className="column">
        <div className={styles.section}>
          <div className={`${styles.sectionContent}`}>
            <h3 className={styles.heading}>A Touch of Elegance in Every Sip</h3>
            <p className={styles.description}>
              Experience the art of presentation with Garnished's array of fresh
              garnishes, adding a touch of elegance to every beverage we serve.
              It's not just a drink; it's an unforgettable work of art.
            </p>
          </div>
          <img
            src={drinkImage3}
            className={styles.sectionImage}
            alt="Specialty Drink"
          />
        </div>
      </section>

      <section className="column">
        <div className={styles.section}>
          <div className={`${styles.sectionContent}`}>
            <h3 className={styles.heading}>Tailored to Your Vision</h3>
            <p className={styles.description}>
              At Garnished, we understand the importance of personalization. No
              matter the occasion, our services are fully flexible to suit your
              unique needs. From corporate functions to intimate weddings, we
              seamlessly blend our offerings into your vision.
            </p>
          </div>
          <img
            src={drinkImage4}
            className={styles.sectionImage}
            alt="Specialty Drink"
          />
        </div>
      </section>

      <section className="column">
        <div className={styles.section}>
          <div className={`${styles.sectionContent}`}>
            <h3 className={styles.heading}>
              A Signature Drink Menu for Your Moment
            </h3>
            <p className={styles.description}>
              Our skilled mixologists are masters at crafting custom drink
              menus, offering a delightful selection that perfectly complements
              the theme and style of your event. From signature cocktails to
              classic favorites, each sip will be a celebration of your moment.
            </p>
          </div>
          <img
            src={drinkImage5}
            className={styles.sectionImage}
            alt="Specialty Drink"
          />
        </div>
      </section>

      <section className="column">
        <div className={styles.section}>
          <div className={`${styles.sectionContent}`}>
            <h3 className={styles.heading}>
              An Elegant Mobile Bar Set Up - Wherever You Choose
            </h3>
            <p className={styles.description}>
              Garnished brings the bar to you, creating an enchanting ambiance
              indoors or outdoors, setting the stage for a memorable
              celebration. Our mobile venue allows you and your guests to savor
              the moment without compromise.
            </p>
          </div>
          <img
            src={drinkImage6}
            className={styles.sectionImage}
            alt="Specialty Drink"
          />
        </div>
      </section>

      <section className="column">
        <div className={styles.section}>
          <div className={`${styles.sectionContent}`}>
            <h3 className={styles.heading}>
              Seasonal Menus for Every Occasion
            </h3>
            <p className={styles.description}>
              Celebrate the changing seasons with Garnished's handpicked menus,
              featuring fresh, vibrant flavors that elevate your event. Embrace
              the spirit of spring, bask in the colors of summer, savor the
              essence of fall, and await the delights of winter.
            </p>
          </div>
          <img
            src={drinkImage7}
            className={styles.sectionImage}
            alt="Specialty Drink"
          />
        </div>
      </section>

      <section className="column">
        <div className={styles.section}>
          <div className={`${styles.sectionContent}`}>
            <h3 className={styles.heading}>Craft Your Story with Us</h3>
            <p className={styles.description}>
              Garnished invites you to embark on a journey of flavor, elegance,
              and celebration. Let us craft your story, where every detail, from
              drinks to garnishes, is meticulously designed to make you feel
              like an honored guest at your own gala.
            </p>
          </div>
          <img
            src={drinkImage8}
            className={styles.sectionImage}
            alt="Specialty Drink"
          />
        </div>
      </section>

      <section className="column">
        <div className={styles.section}>
          <div className={`${styles.sectionContent}`}>
            <h3 className={styles.heading}>Connect with Us</h3>
            <p className={styles.description}>
              Join our community on Facebook and Instagram for inspiration,
              updates, and glimpses of the extraordinary events we create. We
              look forward to connecting with you and making your celebration
              one to remember.
            </p>
          </div>
          <img
            src={drinkImage9}
            className={styles.sectionImage}
            alt="Specialty Drink"
          />
        </div>
      </section>

      <section className="column">
        <div className={styles.section}>
          <div className={`${styles.sectionContent}`}>
            <h3 className={styles.heading}>Ready to Raise the Bar?</h3>
            <p className={styles.description}>
              Are you ready to take your event to new heights? Sign up for a
              personalized account and embark on an enchanting journey of
              flavor, elegance, and seamless service with Garnished.
            </p>
            <p>
              Tell us about your event by filling out a brief form with all the
              essential details. From your preferred drinks to the theme and
              unique requirements, your vision is the heart of our creation
              process.
            </p>
            <p>
              Once we receive your event details, our dedicated team will craft
              a tailor-made quote just for you. We ensure transparency, allowing
              you to make an informed decision for your extraordinary
              celebration.
            </p>
          </div>
          <img
            src={drinkImage10}
            className={styles.sectionImage}
            alt="Specialty Drink"
          />
        </div>
      </section>
    </>
  );
};
