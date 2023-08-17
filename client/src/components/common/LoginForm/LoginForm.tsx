import { Button } from "@/components/common/Button/Button";
import ScrollAnimator from "@/components/common/ScrollAnimator/ScrollAnimator";
import { AuthContext } from "@/hooks/useAuthContext";
import { TClassName } from "@/types/propTypes";
import { getApiEndpoint } from "@/utils/apiConfig";
import { FC, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type TProps = TClassName;

export const LoginForm: FC<TProps> = ({ className }) => {
  const navigate = useNavigate();
  const apiBasePath = getApiEndpoint();
  const { isLoggedIn, login, error } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "reggie@miller.com",
    password: "asdfasdf",
  });

  useEffect(
    function redirectIfLoggedIn() {
      if (isLoggedIn) {
        navigate("/user");
      }
    },
    [isLoggedIn, navigate],
  );

  // on login form submit
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData).catch(() => {
      console.error("Something went wrong. Try again later.");
    });
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
    <ScrollAnimator
      type="SLIDE_DOWN"
      className={`${className ? " " + className : ""}`}
    >
      <form
        action={`${apiBasePath}/user/login`}
        method="POST"
        onSubmit={handleSubmitForm}
      >
        <div className="form-header">
          <h2>Login</h2>
          <p>
            Need an account? <Link to="/signup">Sign up here.</Link>
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
    </ScrollAnimator>
  );
};
