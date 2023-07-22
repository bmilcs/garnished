import { Button } from "@/components/common/Button/Button";
import { getApiEndpoint } from "@/utils/apiConfig";
import { useState } from "react";
import styles from "./Signup.module.scss";

export const Signup = () => {
  const apiBasePath = getApiEndpoint();
  const [formData, setFormData] = useState({
    firstName: "Reggie",
    lastName: "Miller",
    email: "reggie@miller.com",
    password: "asdfasdf",
    confirmPassword: "asdfasdf",
    address: "123 Reggie Lane.",
    city: "Reggieland",
    state: "USA",
    zip: "123456",
    phone: "413-413-4133",
  });

  const signup = async () => {
    const url = `${apiBasePath}/api/user/signup`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
    } catch (e) {
      console.log(e);
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

  return (
    <section className={`column content-spacer ${styles.signup}`}>
      <h2>Signup</h2>

      <form
        action={`${apiBasePath}/api/user/signup`}
        method="POST"
        className={styles.form}
        onSubmit={handleSubmitForm}
      >
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleInputChange}
            value={formData.email}
            required
          />
        </div>

        <div className={styles.inputGroup}>
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

        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            onChange={handleInputChange}
            value={formData.confirmPassword}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            onChange={handleInputChange}
            value={formData.phone}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={handleInputChange}
            value={formData.firstName}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={handleInputChange}
            value={formData.lastName}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            onChange={handleInputChange}
            value={formData.address}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            onChange={handleInputChange}
            value={formData.city}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="state">State</label>
          <input
            type="text"
            name="state"
            id="state"
            onChange={handleInputChange}
            value={formData.state}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="zip">Zip Code</label>
          <input
            type="text"
            name="zip"
            id="zip"
            onChange={handleInputChange}
            value={formData.zip}
            required
          />
        </div>

        <Button type="primary">Signup</Button>
      </form>
    </section>
  );
};
