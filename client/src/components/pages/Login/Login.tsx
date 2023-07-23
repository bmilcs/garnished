import { Button } from "@/components/common/Button/Button";
import { getApiEndpoint } from "@/utils/apiConfig";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../../../types/userTypes";
import styles from "./Login.module.scss";

interface ILoginResponse {
  msg: string;
  data?: IUser;
}

export const Login = () => {
  const navigate = useNavigate();
  const apiBasePath = getApiEndpoint();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "reggie@miller.com",
    password: "asdfasdf",
  });

  const login = async () => {
    const url = `${apiBasePath}/api/user/login`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      // if login successful, redirect to user page
      if (res.status === 200) {
        navigate("/user");
        return;
      }

      // login failed, display error message
      const data = (await res.json()) as ILoginResponse;
      setError(data.msg);
    } catch (e) {
      throw new Error("Something went wrong. Try again later.");
    }
  };

  // on login form submit
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login().catch((err: Error) => setError(err.message));
  };

  // update form data on input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <section className={`column content-spacer ${styles.login}`}>
      <h2>Login</h2>
      <Link to="/signup">Need an account? Sign up here.</Link>

      <form
        action={`${apiBasePath}/api/user/login`}
        method="POST"
        className={styles.form}
        onSubmit={handleSubmitForm}
      >
        <div className="input-group">
          <label htmlFor="username">Email Address</label>
          <input
            type="email"
            name="username"
            id="username"
            onChange={handleInputChange}
            value={formData.username}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleInputChange}
            value={formData.password}
            required
          />
        </div>

        <p className="error">{error}</p>

        <Button type="primary">Login</Button>
      </form>
    </section>
  );
};
