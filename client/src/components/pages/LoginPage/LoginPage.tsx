import { Login } from "@/components/common/Login/Login";
import { FC } from "react";

export const LoginPage: FC = () => {
  return (
    <section className={`content-spacer user-section`}>
      <Login />
    </section>
  );
};
