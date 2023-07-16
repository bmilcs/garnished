import { Email } from "../../assets/Email";
import { Facebook } from "../../assets/Facebook";
import { Instagram } from "../../assets/Instagram";
import "./ComingSoon.css";

export const ComingSoon = () => {
  return (
    <section className="coming-soon">
      <h1>Garnished</h1>
      <p>Coming Soon...</p>
      <div className="socials">
        <Instagram />
        <Facebook />
        <Email />
      </div>
    </section>
  );
};
