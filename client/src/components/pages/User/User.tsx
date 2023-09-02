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
          <div className={styles.dashboardHeader}>
            <h2>User Dashboard</h2>
            <p>Welcome back, {userData?.firstName}!</p>
          </div>

          <div className={styles.contentWrapper}>
            {userData.events.length > 0 ? (
              <div className="user-section-card">
                <h4 className={styles.userDetailsHeader}>Your Events</h4>

                <ul>
                  {userData.events.map(event => (
                    <li key={event._id}>
                      <Link to={`/event/${event._id}`} key={event._id}>
                        {formatDate(event.date)} - {event.eventType}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="user-section-card">
                <h4 className={styles.userDetailsHeader}>Your Events</h4>
                <p>
                  You have no events scheduled. To create one, click on the
                  Create New Event button below.
                </p>
              </div>
            )}

            <div className="user-section-card">
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

              <Button
                type="primary"
                link={"/user/update"}
                className={styles.updatePersonalInfoButton}
              >
                Update Personal Info
              </Button>
            </div>
          </div>

          {error && <p className="error">{error}</p>}

          <ScrollAnimator
            type="SLIDE_UP"
            delay={0.4}
            className="button-wrapper"
          >
            <Button type="primary" link="/event/new">
              Create New Event
            </Button>

            <Button type="secondary" onClick={logout}>
              Logout
            </Button>
          </ScrollAnimator>
        </div>
      </section>
    );
};
