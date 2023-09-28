import AnimatedDiv from "@/components/common/AnimatedDiv/AnimatedDiv";
import { Button } from "@/components/common/Button/Button";
import { HourglassSpinner } from "@/components/common/HourglassSpinner/HourglassSpinner";
import { AuthContext } from "@/hooks/useAuthContext";
import { useInputChange } from "@/hooks/useInputChange";
import { TClassName } from "@/types/propTypes";
import { onFormSubmit } from "@/utils/forms";
import { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

type TProps = TClassName;

export const LoginForm: FC<TProps> = ({ className }) => {
  const [formData, setFormData] = useState({
    username: "reggie@miller.com",
    password: "asdfasdf",
  });
  const { redirectAuthorizedUser, login, error, isAuthPending } =
    useContext(AuthContext);
  const handleInputChange = useInputChange(setFormData);
  const handleSubmitForm = onFormSubmit(() => login(formData));

  useEffect(() => {
    redirectAuthorizedUser();
  }, [redirectAuthorizedUser]);

  if (isAuthPending) return <HourglassSpinner />;

  return (
    <AnimatedDiv
      type="SLIDE_DOWN"
      className={`${className ? " " + className : ""}`}
    >
      <form onSubmit={handleSubmitForm}>
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
    </AnimatedDiv>
  );
};
