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

// when next page or previous page is the only supplied prop
// the GetStartedColumn is used to fill in the empty column

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

// this component is used to navigate between pages using arrows at the
// bottom of the page

export const ArrowNavigation: FC<TProps> = (props: TProps) => {
  const nextPageOnly = props.type === "NEXT_PAGE";
  const previousPageOnly = props.type === "PREVIOUS_PAGE";
  const nextAndPreviousPages = props.type === "NEXT_AND_PREVIOUS_PAGES";

  return (
    <section
      className={`column ${styles.navSection}`}
      aria-label="Arrow Page Navigation"
    >
      <div
        // GetStartedColumn is too large for a 2 column layout on mobile
        // singleColumn class is used to force the grid into a single column
        className={`column ${styles.navWrapper} ${
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

        {/* fill in right column when previousPage is the only supplied prop */}
        {previousPageOnly && <GetStartedColumn />}
      </div>
    </section>
  );
};
