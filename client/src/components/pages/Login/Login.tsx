import { LoginForm } from "@/components/common/LoginForm/LoginForm";
import { FC } from "react";

export const Login: FC = () => {
  return (
    <section className={`content-spacer user-section`}>
      <LoginForm className="user-section-wrapper column" />
    </section>
  );
};
