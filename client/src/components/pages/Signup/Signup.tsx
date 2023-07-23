import { Button } from "@/components/common/Button/Button";
import { IUser } from "@/types/userTypes";
import { getApiEndpoint } from "@/utils/apiConfig";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.scss";

interface ISignupResponse {
  errors?: IError[];
  data: IUser;
}

interface IError {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

export const Signup = () => {
  const apiBasePath = getApiEndpoint();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<IError[]>([]);
  const [formData, setFormData] = useState({
    firstName: "Reggie",
    lastName: "Miller",
    username: "reggie@miller.com",
    password: "asdfasdf",
    confirmPassword: "asdfasdf",
    address: "123 Reggie Lane.",
    city: "Reggieland",
    state: "MA",
    zip: "121356",
    phone: "413-413-4133",
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const signup = async () => {
    // clear errors
    setErrors([]);

    // if passwords don't match, prevent api call
    if (formData.password !== formData.confirmPassword) {
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

    const url = `${apiBasePath}/api/user/signup`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = (await res.json()) as ISignupResponse;

      if (data.errors) {
        setErrors(data.errors);
        return;
      }

      navigate("/user");
    } catch (e) {
      console.error("errors:", e);
    }
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup()
      .then(() => {
        console.log("signup complete");
      })
      .catch(e => console.error("signup error:", e));
  };

  // update form data on input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // get field error message
  const getFieldError = (fieldName: string) => {
    if (errors.length === 0) return "";
    return errors
      .filter(error => error.path === fieldName)
      .map(error => error.msg)[0];
  };

  return (
    <section className={`column content-spacer ${styles.signup}`}>
      <h2>Signup</h2>
      <Link to="/login">Already have an account? Login here.</Link>

      <form
        action={`${apiBasePath}/api/user/signup`}
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
          {errors.length > 0 && <p className="error">{getFieldError("zip")}</p>}
        </div>

        <Button type="primary">Signup</Button>
      </form>
    </section>
  );
};
