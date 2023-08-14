import { Button } from "@/components/common/Button/Button";

export const GetStarted = () => {
  return (
    <>
      <section className="column">
        <h2>Get Started</h2>
        <p>Ready to bring your event to the next level?</p>
        <p>
          Our process is simple. Create an account & fill out the details of
          your event. We will review it, create an estimate and we'll go from
          there.
        </p>

        <Button type="primary" link="/signup">
          Sign Up
        </Button>

        <Button type="primary" link="/login">
          Login
        </Button>
      </section>
    </>
  );
};
