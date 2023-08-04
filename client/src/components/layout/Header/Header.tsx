import { Button } from "@/components/common/Button/Button";
import ScrollAnimator from "@/components/common/ScrollAnimator/ScrollAnimator";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

export const Header: FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(prev => !prev);
  };

  return (
    <header className={`${styles.header}`}>
      <ScrollAnimator
        type="SLIDE_DOWN"
        duration={1.5}
        className={`column ${styles.headerContent}`}
      >
        <h1>
          <a href="/" className={styles.logo}>
            Garnished
          </a>
        </h1>
        <Button type="icon" onClick={toggleNav} className="hamburger">
          <svg
            className={styles.hamburger}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
            />
          </svg>
        </Button>
        <nav className={`${styles.nav} ${isNavOpen ? styles.expanded : ""}`}>
          <ul className={styles.nav__ul}>
            <li>
              <Link to="/" onClick={() => setIsNavOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" onClick={() => setIsNavOpen(false)}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/gallery" onClick={() => setIsNavOpen(false)}>
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setIsNavOpen(false)}>
                Contact
              </Link>
            </li>
            <li>
              <Button
                type="primary"
                link="/new-event"
                onClick={() => setIsNavOpen(false)}
              >
                Get Started
              </Button>
            </li>
          </ul>
        </nav>
      </ScrollAnimator>
    </header>
  );
};
