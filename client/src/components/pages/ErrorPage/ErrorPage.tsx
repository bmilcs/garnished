import { drinks } from "@/assets";
import { Button } from "@/components/common/Button/Button";
import { Hero } from "@/components/common/Hero/Hero";
import { FC } from "react";

type TProps = {
  title?: string;
  subtitle?: string;
};

export const ErrorPage: FC<TProps> = ({
  title = "404",
  subtitle = "Page not found",
}) => {
  return (
    <Hero
      backgroundImage={drinks.specialty_drink_56.full}
      title={title}
      subtitle={subtitle}
      heightInVH={75}
    >
      <Button type="primary" link="/">
        Return Home
      </Button>
    </Hero>
  );
};
