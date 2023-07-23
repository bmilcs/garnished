import { Button } from "@/components/common/Button/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

export const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(prev => !prev);
  };

  return (
    <header className={`column ${styles.header}`}>
      <h1 className={styles.title}>Garnished</h1>

      <Button type="icon" onClick={toggleNav} className="hamburger">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={styles.hamburger}
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 17h14M5 12h14M5 7h14"
          />
        </svg>
      </Button>

      <nav className={`${styles.nav} ${isNavOpen ? styles.expanded : ""}`}>
        <ul className={styles.nav__ul}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/gallery">Gallery</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <Button type="primary" link="signup">
            Schedule Event
          </Button>
        </ul>
      </nav>
    </header>
  );
};
