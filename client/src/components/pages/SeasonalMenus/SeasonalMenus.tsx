import { drinks } from "@/assets";
import autumnMenu from "@/assets/menus/garnished_events_autumn_menu.pdf";
import springMenu from "@/assets/menus/garnished_events_spring_menu.pdf";
import summerMenu from "@/assets/menus/garnished_events_summer_menu.pdf";
import winterMenu from "@/assets/menus/garnished_events_winter_menu.pdf";
import AnimatedDiv from "@/components/common/AnimatedDiv/AnimatedDiv";
import { ArrowNavigation } from "@/components/common/ArrowNavigation/ArrowNavigation";
import { Button } from "@/components/common/Button/Button";
import { Hero } from "@/components/common/Hero/Hero";
import { HourglassSpinner } from "@/components/common/HourglassSpinner/HourglassSpinner";
import { Dispatch, FC, useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import styles from "./SeasonalMenus.module.scss";

type TMenu = "winter" | "spring" | "summer" | "autumn";

type TMenuSelector = {
  menu: TMenu;
  setMenu: Dispatch<React.SetStateAction<TMenu>>;
};

//
// seasonal menus page
//

export const SeasonalMenus: FC = () => {
  const [menu, setMenu] = useState<TMenu>("winter");
  const [menuFile, setMenuFile] = useState<string>(winterMenu);
  const [numPages, setNumPages] = useState<number>(0);

  useEffect(
    function swapToMenuSelection() {
      menu === "winter"
        ? setMenuFile(winterMenu)
        : menu === "spring"
        ? setMenuFile(springMenu)
        : menu === "summer"
        ? setMenuFile(summerMenu)
        : setMenuFile(autumnMenu);
    },
    [menu],
  );

  // required for react-pdf to load pdf files in React
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url,
  ).toString();

  return (
    <>
      <Hero
        title="Seasonal"
        titleSpan="Menus"
        subtitle="Your favorite drinks, all year round"
        backgroundImage={drinks.specialty_drink_15.full}
      />

      <section className={`column content-spacer`}>
        <div className={styles.about}>
          <AnimatedDiv type={"SLIDE_DOWN"} delay={0.25}>
            <h2>Seasonal Menus</h2>
            <p>
              Garnished Events is proud to offer seasonal menus for all of our
              events. We also offer a variety of specialty drinks that are
              available year-round. Our seasonal menus are designed to highlight
              the best flavors of the season. We use fresh ingredients to create
              unique drinks that are sure to impress your guests.
            </p>
          </AnimatedDiv>

          <AnimatedDiv
            delay={0.5}
            type={"SLIDE_UP"}
            className={styles.aboutRightColumn}
          >
            <h2>Downloads</h2>
            <ul>
              <li>
                <a href={springMenu}>Spring Menu</a>
              </li>
              <li>
                <a href={summerMenu}>Summer Menu</a>
              </li>
              <li>
                <a href={autumnMenu}>Autumn Menu</a>
              </li>
              <li>
                <a href={winterMenu}>Winter Menu</a>
              </li>
            </ul>
          </AnimatedDiv>
        </div>

        <AnimatedDiv type="SLIDE_UP" delay={1}>
          <div className={styles.livePreviewMenuContainer}>
            <h2>Live Preview</h2>
            <MenuSelector setMenu={setMenu} menu={menu} />
          </div>

          {/* pdf file */}

          <Document
            file={menuFile}
            className={styles.pdfDocument}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={HourglassSpinner}
          >
            {numPages !== 0 &&
              [...(Array(numPages) as undefined[])]
                .map((x, i) => i + 1)
                .map(page => (
                  <Page
                    key={page}
                    pageNumber={page}
                    renderTextLayer={false}
                    scale={2}
                    className={styles.pdfPage}
                    loading={HourglassSpinner}
                  />
                ))}
          </Document>
        </AnimatedDiv>
      </section>

      <ArrowNavigation
        type="NEXT_AND_PREVIOUS_PAGES"
        nextPageUrl="/gallery"
        nextPageLabel="Gallery"
        previousPageUrl="/services"
        previousPageLabel="Services"
      />
    </>
  );
};

//
// menu selector component
//

const MenuSelector: FC<TMenuSelector> = ({ menu, setMenu }) => {
  return (
    <div className={styles.tabs}>
      <Button
        type="outline"
        className={menu === "spring" ? styles.activeTabButton : ""}
        onClick={() => setMenu("spring")}
      >
        Spring
      </Button>

      <Button
        type="outline"
        className={menu === "summer" ? styles.activeTabButton : ""}
        onClick={() => setMenu("summer")}
      >
        Summer
      </Button>

      <Button
        type="outline"
        className={menu === "autumn" ? styles.activeTabButton : ""}
        onClick={() => setMenu("autumn")}
      >
        Autumn
      </Button>

      <Button
        type="outline"
        className={menu === "winter" ? styles.activeTabButton : ""}
        onClick={() => setMenu("winter")}
      >
        Winter
      </Button>
    </div>
  );
};
