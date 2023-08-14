//
// css custom properties
//

const contentPadding = "clamp(1.5rem, 5vw, 3rem)";
const sectionPadding = "calc(3 * var(--vertical-spacer-large))";
const fwNormal = "400";
const fwBold = "700";
const fwXBold = "800";
const fsBaseSmall = "clamp(13px, 2vw, 15px)";
const fsBase = "clamp(14px, 2vw, 16px)";
const fsBaseLarge = "clamp(18px, 5vw, 20px)";
const fsHeadingSmall = "clamp(18px, 3vw, 22px)";
const fsHeading = "clamp(24px, 4vw, 36px)";
const fsHeadingLarge = "clamp(30px, 5vw, 42px)";
const fsHeadingHero = "clamp(48px, 10vw, 80px)";
const borderRadius100 = "0.25rem";
const borderRadius200 = "0.5rem";
const clrNeutral100 = "hsla(0, 0%, 97%, 100%)";
const clrNeutral100t = "hsla(0, 0%, 96%, 25%)";
const clrNeutral150 = "hsla(0, 0%, 94%, 100%)";
const clrNeutral200 = "hsla(0, 0%, 90%, 100%)";
const clrNeutral300 = "hsla(0, 0%, 70%, 100%)";
const clrNeutral500 = "hsla(0, 2%, 8%, 100%)";
const clrNeutral600 = "hsla(0, 2%, 29%, 100%)";
const clrNeutral700 = "hsla(0, 2%, 22%, 100%)";
const clrNeutral800 = "hsla(0, 0%, 16%, 100%)";
const clrNeutral850 = "hsla(0, 2%, 10%, 100%)";
const clrNeutral900 = "hsla(0, 2%, 8%, 100%)";
const clrNeutral900t = "hsla(0, 0%, 8%, 75%)";
const clrPrimary = "hsl(47, 73%, 58%)";
const clrPrimaryLight = "hsl(47, 73%, 68%)";
const clbrBg = clrNeutral100;
const clrBgLight = clrNeutral200;
const clrBgLighter = clrNeutral300;
const clrFg = clrNeutral900;
const clrFgLight = clrNeutral800;
const clrFgLighter = clrNeutral700;

type TBaseEmailTemplate = {
  header: string;
  content: string;
};

export const baseEmailTemplate = ({ header, content }: TBaseEmailTemplate) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Garnished Events</title>
    </head>
    <body style="background: ${clbrBg}; color: ${clrFg}; padding: ${contentPadding}">
      <table cellpadding="0" cellspacing="0" border="0" style="margin-inline: auto;">
        <tr>
          <td style="padding: 0px;">
            <h1 style="font-size: ${fsHeadingLarge};">${header}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 0px;">
            <p style="font-size: ${fsBase};">${content}</p>
          </td>
        </tr>
      </table>
    </body>
    </html>  
  `;
};
