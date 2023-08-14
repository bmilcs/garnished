import { Button } from "@/components/common/Button/Button";
import { AuthContext } from "@/hooks/useAuthContext";
import { TUser } from "@/types/userTypes";
import { getApiEndpoint } from "@/utils/apiConfig";
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
    if (isAuthPending) return;

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

        if (data.user) {
          // user is logged in, set user data
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
    <section className={`column content-spacer ${styles.signup}`}>
      <h2>User Details</h2>

      {userData && (
        <div>
          <p>{userData.firstName}</p>
          <p>{userData.lastName}</p>
          <p>{userData.username}</p>
          <p>{userData.address}</p>
          <p>{userData.city}</p>
          <p>{userData.zip}</p>
          <p>{userData.state}</p>
          <p>{userData.phone}</p>
        </div>
      )}

      {userData && userData.events.length > 0 && (
        <div className={styles.events}>
          {userData.events.map(event => (
            <Link to={`/event/${event._id}`} key={event._id}>
              {event.date}
            </Link>
          ))}
        </div>
      )}

      {error && <p className="error">{error}</p>}

      <Button type="primary" link="/new-event">
        New Event
      </Button>

      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </section>
  );
};
