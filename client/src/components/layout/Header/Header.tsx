import { Button } from "@/components/common/Button/Button";
import ScrollAnimator from "@/components/common/ScrollAnimator/ScrollAnimator";
import { AuthContext } from "@/hooks/useAuthContext";
import { navigationLinks } from "@/utils/navigation";
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
        {/* logo */}

        <h1>
          <Link to="/" className={styles.logo}>
            Garnished
          </Link>
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

        <nav
          className={`${styles.nav} ${isNavOpen ? styles.expanded : ""}`}
          aria-label="Main Navigation"
        >
          <ul className={styles.nav__ul}>
            {/* navigation links */}

            {navigationLinks.map(({ name, link }) => (
              <li key={name}>
                <Link
                  to={link}
                  className={styles.nav__link}
                  onClick={() => setIsNavOpen(false)}
                >
                  {name}
                </Link>
              </li>
            ))}

            {/* get started/dashboard  */}

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
