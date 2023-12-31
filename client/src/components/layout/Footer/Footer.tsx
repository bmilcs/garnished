import AnimatedDiv from "@/components/common/AnimatedDiv/AnimatedDiv";
import { FacebookIcon } from "@/components/common/FacebookIcon/FacebookIcon";
import { GitHubIcon } from "@/components/common/GitHubIcon/GitHubIcon";
import { InstagramIcon } from "@/components/common/InstagramIcon/InstagramIcon";
import { navigationLinks } from "@/utils/navigation";
import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={`column ${styles.footerWrapper}`}>
        <AnimatedDiv type="SLIDE_UP" when="IN_VIEW">
          {/* logo */}

          <p className={styles.footerLogo}>Garnished</p>
          <p>Premium Mobile Bar</p>

          <div className={styles.footerAuthLinks}>
            <Link
              className={`${styles.footerNavLink} ${styles.footerAuthLink}`}
              to="/login"
            >
              Login
            </Link>
            <span className={styles.footerAuthDivider}>|</span>
            <Link
              className={`${styles.footerNavLink} ${styles.footerAuthLink}`}
              to="/signup"
            >
              Sign Up
            </Link>
          </div>
        </AnimatedDiv>

        {/* navigation */}

        <AnimatedDiv type="SLIDE_UP" when="IN_VIEW" delay={0.2}>
          <nav className={styles.footerNav} aria-label="Secondary Navigation">
            <ul className={styles.footerNavUl}>
              {navigationLinks.map(({ name, link }) => (
                <li key={name}>
                  <Link className={styles.footerNavLink} to={link}>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </AnimatedDiv>

        <AnimatedDiv
          type="SLIDE_UP"
          when="IN_VIEW"
          delay={0.4}
          className={styles.rightColumn}
        >
          {/* socials */}

          <p className={styles.socialTitle}>Follow Us</p>
          <div className={styles.social}>
            <FacebookIcon
              url="https://www.facebook.com/garnished.llp"
              className={styles.socialIcon}
            />
            <InstagramIcon
              url="https://www.instagram.com/garnished_events/"
              className={styles.socialIcon}
            />
          </div>
        </AnimatedDiv>
      </div>

      {/* credits / copyright bottom bar */}

      <AnimatedDiv
        type="FADE_IN"
        when="IN_VIEW"
        delay={0.6}
        className={styles.credits}
      >
        <div className={`column ${styles.creditsWrapper}`}>
          <p className={styles.footerCopy}>&copy; 2023 Garnished LLP</p>

          <div className={styles.github}>
            <p>
              Created by{" "}
              <a
                href="https://bmilcs.com"
                target="_blank"
                className={styles.creditLink}
              >
                Bryan Miller
              </a>
            </p>

            <GitHubIcon
              url="https://github.com/bmilcs/garnished"
              className={styles.githubIcon}
            />
          </div>
        </div>
      </AnimatedDiv>
    </footer>
  );
};
