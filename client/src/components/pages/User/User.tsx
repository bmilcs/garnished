import { Button } from "@/components/common/Button/Button";
import { IUser } from "@/types/userTypes";
import { getApiEndpoint } from "@/utils/apiConfig";
import { logout } from "@/utils/logout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./User.module.scss";

interface IUserApiResponse {
  msg: string;
  user: IUser;
}

export const User = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [error, setError] = useState("");

  // retrieve user data on initial page load
  useEffect(() => {
    getUserData().catch((error: Error) => setError(error.message));

    async function getUserData() {
      const apiBasePath = getApiEndpoint();
      const url = `${apiBasePath}/api/user`;
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = (await res.json()) as IUserApiResponse;

        if (data.user) {
          // user is logged in, set user data
          setUserData(data.user);
        } else {
          // user is not logged in, redirect to login page
          navigate("/login");
        }
      } catch (e) {
        throw new Error(
          "Something went wrong while logging in. Try again later.",
        );
      }
    }
  }, [navigate]);

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

      {error && <p className="error">{error}</p>}

      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </section>
  );
};
