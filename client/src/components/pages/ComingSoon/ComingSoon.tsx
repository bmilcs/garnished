import comingSoon from "@/assets/comingSoon.jpg";
import { EmailIcon } from "@/components/common/EmailIcon/EmailIcon";
import { FacebookIcon } from "@/components/common/FacebookIcon/FacebookIcon";
import { InstagramIcon } from "@/components/common/InstagramIcon/InstagramIcon";
import { FC } from "react";
import styles from "./ComingSoon.module.scss";

export const ComingSoon: FC = () => {
  return (
    <section className={styles.comingsoon}>
      <h1>Garnished</h1>
      <p>Coming Soon...</p>
      <img src={comingSoon} alt="Specialty Drink" />
      <div className={styles.socials}>
        <FacebookIcon url="https://www.facebook.com/garnished.llp" />
        <InstagramIcon url="https://www.instagram.com/garnished_events/" />
        <EmailIcon url="info@garnished.events" />
      </div>
    </section>
  );
};
