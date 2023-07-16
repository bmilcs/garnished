import comingSoon from "@/assets/comingSoon.jpg";
import { Email } from "@/components/common/Email/Email";
import { Facebook } from "@/components/common/Facebook/Facebook";
import { Instagram } from "@/components/common/Instagram/Instagram";
import styles from "./ComingSoon.module.scss";

export const ComingSoon = () => {
  return (
    <section className={styles.comingsoon}>
      <h1>Garnished</h1>
      <p>Coming Soon...</p>
      <img src={comingSoon} alt="Specialty Drink" />
      <div className={styles.socials}>
        <Instagram />
        <Facebook />
        <Email />
      </div>
    </section>
  );
};
