import { Button } from "@/components/common/Button/Button";
import ScrollAnimator from "@/components/common/ScrollAnimator/ScrollAnimator";
import { AuthContext } from "@/hooks/useAuthContext";
import { TUser } from "@/types/userTypes";
import { getApiEndpoint } from "@/utils/apiConfig";
import { formatDate, formatPhoneNumber } from "@/utils/formatters";
import { FC, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./User.module.scss";

type TUserApiResponse = {
  msg: string;
  user: TUser;
};

export const User: FC = () => {
  const navigate = useNavigate();
  const { isAuthPending, isLoggedIn, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState<TUser | null>(null);
  const [error, setError] = useState("");

  // retrieve user data on initial page load
  useEffect(() => {
    if (isAuthPending) {
      return;
    }

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    getUserData().catch((error: Error) => setError(error.message));

    async function getUserData() {
      const apiBasePath = getApiEndpoint();
      const url = `${apiBasePath}/user`;
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = (await res.json()) as TUserApiResponse;

        // if user is logged in
        if (data.user) {
          setUserData(data.user);
        }
      } catch (e) {
        throw new Error(
          "Something went wrong while logging in. Try again later.",
        );
      }
    }
  }, [isLoggedIn, isAuthPending, navigate]);

  const handleLogout = () => {
    logout()
      .then(() => {
        navigate("/login");
      })
      .catch(() =>
        setError("Something went wrong while logging out. Try again later."),
      );
  };

  return (
    <section className={`content-spacer user-section`}>
      <div className={`column user-section-wrapper`}>
        <div className={styles.dashboardHeader}>
          <h2>User Dashboard</h2>
          <p>Welcome back, {userData?.firstName}!</p>
        </div>

        {userData && (
          <ScrollAnimator type="SLIDE_RIGHT" className="user-section-card">
            <h4 className={styles.userDetailsHeader}>Personal Info</h4>
            <p>
              {userData.firstName} {userData.lastName}
            </p>
            <p>{userData.address}</p>
            <p>
              {userData.city}, {userData.state}, {userData.zip}
            </p>

            <h4 className={styles.userDetailsHeader}>Contact Info</h4>
            <p>{formatPhoneNumber(userData.phone)}</p>
            <p>{userData.username}</p>
          </ScrollAnimator>
        )}

        {userData && userData.events.length > 0 && (
          <ScrollAnimator
            type="SLIDE_UP"
            delay={0.2}
            className="user-section-card"
          >
            {userData.events.map(event => (
              <Link to={`/event/${event._id}`} key={event._id}>
                {formatDate(event.date)} - {event.eventType}
              </Link>
            ))}
          </ScrollAnimator>
        )}

        {error && <p className="error">{error}</p>}

        <ScrollAnimator type="SLIDE_UP" delay={0.4} className="button-wrapper">
          <Button type="primary" link="/new-event">
            New Event
          </Button>

          <Button type="primary" onClick={handleLogout}>
            Logout
          </Button>
        </ScrollAnimator>
      </div>
    </section>
  );
};
