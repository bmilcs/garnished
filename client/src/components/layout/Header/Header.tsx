import { Button } from "@/components/common/Button/Button";
import ScrollAnimator from "@/components/common/ScrollAnimator/ScrollAnimator";
import { AuthContext } from "@/hooks/useAuthContext";
import { FC, useContext, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

export const Header: FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  const toggleNav = () => {
    setIsNavOpen(prev => !prev);
  };

  return (
    <header className={`${styles.header}`}>
      <ScrollAnimator
        type="SLIDE_DOWN"
        className={`column ${styles.headerContent}`}
      >
        <h1>
          <a href="/" className={styles.logo}>
            Garnished
          </a>
        </h1>

        {/* hamburger menu */}

        <Button
          type="icon"
          onClick={toggleNav}
          className="hamburger"
          ariaLabel="Open Navigation Menu"
        >
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

        {/* navigation */}

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
              {isLoggedIn ? (
                <>
                  <Button
                    type="primary"
                    link="/user"
                    onClick={() => setIsNavOpen(false)}
                  >
                    Dashboard
                  </Button>
                </>
              ) : (
                <Button
                  type="primary"
                  link="/get-started"
                  onClick={() => setIsNavOpen(false)}
                >
                  Get Started
                </Button>
              )}
            </li>
          </ul>
        </nav>
      </ScrollAnimator>
    </header>
  );
};
