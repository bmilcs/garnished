import { Button } from "@/components/common/Button/Button";
import backgroundImg from "../../../assets/specialtyDrink-21.jpg";
import styles from "./Home.module.scss";

export const Home = () => {
  return (
    <section className={styles.home}>
      <img
        className={styles.hero_img}
        src={backgroundImg}
        alt="Specialty Drinks with Limes"
      />
      <div
        className={`column ${styles.hero}`}
        style={{ backgroundImage: backgroundImg }}
      >
        <h2 className={styles.title}>Garnished</h2>
        <p className={styles.subtitle}>The Premium Mobile Bar Service</p>
        <Button type="secondary" link="/signup">
          Schedule Event
        </Button>
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
    </section>
  );
};
