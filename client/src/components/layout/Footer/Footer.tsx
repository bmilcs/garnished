import { Facebook } from "@/components/common/Facebook/Facebook";
import { GitHubIcon } from "@/components/common/GitHubIcon/GitHubIcon";
import { Instagram } from "@/components/common/Instagram/Instagram";
import ScrollAnimator from "@/components/common/ScrollAnimator/ScrollAnimator";
import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={`column ${styles.footerWrapper}`}>
        <ScrollAnimator type="SLIDE_UP">
          <h3 className={styles.footerLogo}>Garnished</h3>
          <p>Premium Mobile Bar</p>
        </ScrollAnimator>

        <ScrollAnimator type="SLIDE_UP" delay={0.2}>
          <nav className={styles.footerNav}>
            <ul className={styles.footerNavUl}>
              <li>
                <Link className={styles.footerLink} to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className={styles.footerLink} to="/services">
                  Services
                </Link>
              </li>
              <li>
                <Link className={styles.footerLink} to="/gallery">
                  Gallery
                </Link>
              </li>
              <li>
                <Link className={styles.footerLink} to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className={styles.footerLink} to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className={styles.footerLink} to="/signup">
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        </ScrollAnimator>

        <ScrollAnimator type="SLIDE_UP" delay={0.4}>
          <div className={styles.social}>
            <Facebook url="https://www.facebook.com/garnished.llp" />
            <Instagram url="https://www.instagram.com/garnished_events/" />
          </div>
        </ScrollAnimator>
      </div>

      <ScrollAnimator type="FADE_IN" className={styles.credits} delay={0.6}>
        <div className={`column ${styles.creditsWrapper}`}>
          <p className={styles.footerCopy}>&copy; 2023 Garnished LLP</p>

          <div className={styles.github}>
            <p>
              Created by{" "}
              <a href="https://bmilcs.com" target="_blank">
                Bryan Miller
              </a>
            </p>
            <GitHubIcon
              url="https://github.com/bmilcs/garnished"
              className={styles.githubIcon}
            />
          </div>
        </div>
      </ScrollAnimator>
    </footer>
  );
};
