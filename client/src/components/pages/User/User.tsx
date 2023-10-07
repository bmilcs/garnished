import AnimatedDiv from "@/components/common/AnimatedDiv/AnimatedDiv";
import { Button } from "@/components/common/Button/Button";
import { HourglassSpinner } from "@/components/common/HourglassSpinner/HourglassSpinner";
import { ErrorPage } from "@/components/pages/ErrorPage/ErrorPage";
import { AuthContext } from "@/hooks/useAuthContext";
import { useUserData } from "@/hooks/useUserData";
import { formatDate } from "@/utils/formatters";
import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./User.module.scss";

export const User: FC = () => {
  const { userData, isPending, error } = useUserData();
  const { logout } = useContext(AuthContext);

  if (isPending) {
    return <HourglassSpinner />;
  }

  if (error || (!isPending && !userData)) {
    return <ErrorPage title="404" subtitle="User not found." />;
  }

  if (userData)
    return (
      <section className={`content-spacer user-section`}>
        <AnimatedDiv
          type="SLIDE_DOWN"
          className={`column user-section-wrapper`}
        >
          {/* page header */}

          <div className={styles.dashboardHeader}>
            <h1 className="h2">User Dashboard</h1>
            <p>Welcome back, {userData?.firstName}!</p>
          </div>

          {/* 2 column layout */}

          <div className={styles.contentWrapper}>
            {/* events column */}
            {userData.events.length > 0 ? (
              //  user has events
              <div className="user-section-card">
                <h2 className={`h4 ${styles.userDetailsHeader}`}>
                  Your Events
                </h2>
                <ul>
                  {userData.events.map(event => (
                    <li key={event._id}>
                      <Link
                        to={`/event/${event._id}`}
                        className={styles.eventLink}
                      >
                        {formatDate(event.date)} - {event.eventType}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              // user has no events
              <div className="user-section-card">
                <h2 className={`h4 ${styles.userDetailsHeader}`}>
                  Your Events
                </h2>
                <p>
                  You have no events scheduled. To create one, click on the
                  Create New Event button below.
                </p>
              </div>
            )}

            {/* personal details column */}

            <div className="user-section-card">
              <h2 className={`h4 ${styles.userDetailsHeader}`}>
                Personal Info
              </h2>
              <p>
                {userData.firstName} {userData.lastName}
              </p>
              <p>{userData.address}</p>
              <p>
                {userData.city}, {userData.state}, {userData.zip}
              </p>
              <h2 className={`h4 ${styles.userDetailsHeader}`}>Contact Info</h2>
              <p>{userData.phone}</p>
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

          {/* bottom buttons */}

          <AnimatedDiv type="SLIDE_UP" delay={0.4} className="button-wrapper">
            <Button type="primary" link="/event/new">
              Create New Event
            </Button>
            <Button type="secondary" onClick={logout}>
              Logout
            </Button>
          </AnimatedDiv>
        </AnimatedDiv>
      </section>
    );
};
