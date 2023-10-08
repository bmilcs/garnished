import { ArrowIcon } from "@/components/common/ArrowIcon/ArrowIcon";
import { Button } from "@/components/common/Button/Button";
import { GetStartedButton } from "@/components/common/GetStartedButton/GetStartedButton";
import { FC } from "react";
import styles from "./ArrowNavigation.module.scss";

type TNextPage = {
  nextPageUrl: string;
  nextPageLabel: string;
};

type TPreviousPage = {
  previousPageUrl: string;
  previousPageLabel: string;
};

type TProps =
  | ({ type: "NEXT_PAGE" } & TNextPage)
  | ({ type: "PREVIOUS_PAGE" } & TPreviousPage)
  | ({ type: "NEXT_AND_PREVIOUS_PAGES" } & TNextPage & TPreviousPage);

export const ArrowNavigation: FC<TProps> = (props: TProps) => {
  const nextPageOnly = props.type === "NEXT_PAGE";
  const previousPageOnly = props.type === "PREVIOUS_PAGE";
  const nextAndPreviousPages = props.type === "NEXT_AND_PREVIOUS_PAGES";

  return (
    <section
      className={styles.ctaSection}
      aria-label="Call To Action Navigation"
    >
      <div
        className={`column ${styles.ctaWrapper} ${
          nextPageOnly || previousPageOnly ? styles.singleColumn : ""
        }`}
      >
        {/* fill in left column when nextPage is the only supplied prop */}
        {nextPageOnly && <GetStartedColumn />}

        {(previousPageOnly || nextAndPreviousPages) && (
          <Button
            type="icon"
            link={props.previousPageUrl}
            className={styles.navButton}
          >
            <div className={styles.buttonContent}>
              <ArrowIcon direction="left" className={styles.navArrow} />
              <p className={styles.navLabel}>{props.previousPageLabel}</p>
            </div>
          </Button>
        )}

        {(nextPageOnly || nextAndPreviousPages) && (
          <Button
            type="icon"
            link={props.nextPageUrl}
            className={styles.navButton}
          >
            <div className={styles.buttonContent}>
              <ArrowIcon direction="right" className={styles.navArrow} />
              <p className={styles.navLabel}>{props.nextPageLabel}</p>
            </div>
          </Button>
        )}

        {/* fill in right column when nextPage is the only supplied prop */}
        {previousPageOnly && <GetStartedColumn />}
      </div>
    </section>
  );
};

const GetStartedColumn = () => {
  return (
    <div className={styles.getStartedColumn}>
      <h2 className={styles.getStartedHeading}>
        Ready for your free estimate?
      </h2>
      <GetStartedButton />
    </div>
  );
};
