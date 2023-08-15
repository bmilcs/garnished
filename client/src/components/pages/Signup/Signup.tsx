import { Button } from "@/components/common/Button/Button";
import ScrollAnimator from "@/components/common/ScrollAnimator/ScrollAnimator";
import { AuthContext } from "@/hooks/useAuthContext";
import { getApiEndpoint } from "@/utils/apiConfig";
import { FC, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.scss";

type TSignupResponse = {
  msg: string;
  authenticated?: boolean;
  errors?: TError[];
};

type TError = {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
};

export const Signup: FC = () => {
  const apiBasePath = getApiEndpoint();
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [errors, setErrors] = useState<TError[]>([]);
  const [formData, setFormData] = useState({
    firstName: "Reggie",
    lastName: "Miller",
    username: "reggie@miller.com",
    password: "asdfasdf",
    confirmPassword: "asdfasdf",
    address: "123 Reggie Lane.",
    city: "Reggieland",
    state: "MA",
    zip: "12135",
    phone: "413-413-4133",
  });

  useEffect(
    function redirectIfLoggedIn() {
      if (isLoggedIn) {
        navigate("/user");
      }
    },
    [isLoggedIn, navigate],
  );

  const signup = async () => {
    // clear previous errors
    setErrors([]);

    // prevent api call if passwords don't match
    if (formData.password !== formData.confirmPassword) {
      // use express-validator error format for consistency
      setErrors(prev => [
        ...prev,
        {
          type: "error",
          value: "Passwords do not match.",
          msg: "Passwords do not match.",
          path: "password",
          location: "body",
        },
      ]);
      return;
    }

    // signup utilizes an array of express-validator errors, so moving this to authContext would require
    // a lot of refactoring. For now, we'll just use fetch here.
    const url = `${apiBasePath}/user/signup`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = (await res.json()) as TSignupResponse;

      if (data.authenticated) {
        // useEffect will redirect to /user if isLoggedIn is true
        setIsLoggedIn?.(true);
      } else if (data.errors) {
        setErrors(data.errors);
      }
    } catch (e) {
      console.error("Something went wrong. Try again later.");
    }
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup().catch(e => console.error(e));
  };

  // update formData state on input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // get field error message for a field from errors array, which is in express-validator format
  const getFieldError = (fieldName: string) => {
    if (errors.length === 0) return "";
    return errors
      .filter(error => error.path === fieldName)
      .map(error => error.msg)[0];
  };

  return (
    <section className={`content-spacer user-section`}>
      <ScrollAnimator
        type="SLIDE_DOWN"
        className={`column user-section-wrapper`}
      >
        <form
          action={`${apiBasePath}/user/signup`}
          method="POST"
          className={styles.form}
          onSubmit={handleSubmitForm}
        >
          <div className="form-header">
            <h2>Signup</h2>
            <p>
              Already have an account? <Link to="/login">Login here.</Link>
            </p>
          </div>

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
            {errors.length > 0 && (
              <p className="error">{getFieldError("username")}</p>
            )}
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
            {errors.length > 0 && (
              <p className="error">{getFieldError("password")}</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              onChange={handleInputChange}
              value={formData.confirmPassword}
              required
            />
            {errors.length > 0 && (
              <p className="error">{getFieldError("confirmPassword")}</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              onChange={handleInputChange}
              value={formData.phone}
              required
            />
            {errors.length > 0 && (
              <p className="error">{getFieldError("phone")}</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              onChange={handleInputChange}
              value={formData.firstName}
              required
            />
            {errors.length > 0 && (
              <p className="error">{getFieldError("firstName")}</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              onChange={handleInputChange}
              value={formData.lastName}
              required
            />
            {errors.length > 0 && (
              <p className="error">{getFieldError("lastName")}</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              onChange={handleInputChange}
              value={formData.address}
              required
            />
            {errors.length > 0 && (
              <p className="error">{getFieldError("address")}</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              id="city"
              onChange={handleInputChange}
              value={formData.city}
              required
            />
            {errors.length > 0 && (
              <p className="error">{getFieldError("city")}</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              name="state"
              id="state"
              onChange={handleInputChange}
              value={formData.state}
              required
            />
            {errors.length > 0 && (
              <p className="error">{getFieldError("state")}</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="zip">Zip Code</label>
            <input
              type="text"
              name="zip"
              id="zip"
              maxLength={5}
              onChange={handleInputChange}
              value={formData.zip}
              required
            />
            {errors.length > 0 && (
              <p className="error">{getFieldError("zip")}</p>
            )}
          </div>

          <Button type="primary">Signup</Button>
        </form>
      </ScrollAnimator>
    </section>
  );
};
