import { Button } from "@/components/common/Button/Button";
import { HourglassSpinner } from "@/components/common/HourglassSpinner/HourglassSpinner";
import ScrollAnimator from "@/components/common/ScrollAnimator/ScrollAnimator";
import { AuthContext } from "@/hooks/useAuthContext";
import { useUserData } from "@/hooks/useUserData";
import { formatDate, formatPhoneNumber } from "@/utils/formatters";
import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./User.module.scss";

export const User: FC = () => {
  const { userData, isPending, error } = useUserData();
  const { logout } = useContext(AuthContext);

  if (isPending) return <HourglassSpinner />;

  if (userData)
    return (
      <section className={`content-spacer user-section`}>
        <div className={`column user-section-wrapper`}>
          <ScrollAnimator type="SLIDE_DOWN" className={styles.dashboardHeader}>
            <h2>User Dashboard</h2>
            <p>Welcome back, {userData?.firstName}!</p>
          </ScrollAnimator>

          <div className={styles.contentWrapper}>
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
                <h4 className={styles.userDetailsHeader}>Your Events</h4>

                {userData.events.map(event => (
                  <Link to={`/event/${event._id}`} key={event._id}>
                    {formatDate(event.date)} - {event.eventType}
                  </Link>
                ))}
              </ScrollAnimator>
            )}
          </div>

          {error && <p className="error">{error}</p>}

          <ScrollAnimator
            type="SLIDE_UP"
            delay={0.4}
            className="button-wrapper"
          >
            <Button type="secondary" link="/new-event">
              Create New Event
            </Button>

            <Button type="primary" onClick={logout}>
              Logout
            </Button>
          </ScrollAnimator>
        </div>
      </section>
    );
};
