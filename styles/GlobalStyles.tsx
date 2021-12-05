import React from "react";
import { Global } from "@emotion/react";
import tw, { css, theme, GlobalStyles as BaseStyles } from "twin.macro";

const customStyles = css`
  /* ADDING FONT STYLES AS GLOBAL STYLES */

  @font-face {
    font-family: "InterVar";
    font-style: normal;
    font-weight: 100 900;
    font-display: optional;
    src: url(/fonts/intervar.woff2) format("woff2");
    /* unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD; */
  }

  /* html {
    font-family: "Inter var", sans-serif;
  }
  @supports (font-variation-settings: normal) {
    html {
      font-family: "Inter var", sans-serif;
    }
  } */

  @font-face {
    font-family: "InterVar";
    font-weight: 100 900;
    /* OVDE UMESTO swap ILI block KORISTICEMO optional
    SVE U CILJU DA NAM TEXT NE BI FLASH-OVAO, NE BI BIO PRIKAZAN
    NA SEKUNDU, ILI DA SE NE BI MENJAO FROM DEFULT FONT-A
    (USTVARI JEDNOM RECUJU, OVIM SE PREVENTIRA LAYOUT SHIFT)*/
    font-display: optional;
    /*  */
    font-style: normal;
    font-named-instance: "Regular";
    src: url("/fonts/intervarroman.woff2") format("woff2");
  }
  @font-face {
    font-family: "InterVar";
    font-weight: 100 900;
    /* OVDE UMESTO swap ILI block KORISTICEMO optional
    SVE U CILJU DA NAM TEXT NE BI FLASH-OVAO, NE BI BIO PRIKAZAN
    NA SEKUNDU, ILI DA SE NE BI MENJAO FROM DEFULT FONT-A */
    font-display: optional;
    /*  */
    font-style: italic;
    font-named-instance: "Italic";
    src: url("/fonts/intervaritalic.woff2") format("woff2");
  }

  /* --------------------------------------------------------------------------
  [EXPERIMENTAL] Multi-axis, single variable font.
  Slant axis is not yet widely supported (as of February 2019) and thus this
  multi-axis single variable font is opt-in rather than the default.
  When using this, you will probably need to set font-variation-settings
  explicitly, e.g.
    * { font-variation-settings: "slnt" 0deg }
    .italic { font-variation-settings: "slnt" 10deg }
  */
  @font-face {
    font-family: "InterVarExperimental";
    font-weight: 100 900;
    /* font-display: swap; */
    /* OVDE UMESTO swap ILI block KORISTICEMO optional
    SVE U CILJU DA NAM TEXT NE BI FLASH-OVAO, NE BI BIO PRIKAZAN
    NA SEKUNDU, ILI DA SE NE BI MENJAO FROM DEFULT FONT-A */
    font-display: optional;
    /*  */
    font-style: oblique 0deg 10deg;
    src: url("/fonts/intervar.woff2") format("woff2");
  }

  /* MONOSPACED */
  @font-face {
    font-family: "FiraMono";
    font-style: normal;
    font-weight: 400;
    font-display: optional;
    src: url("../fonts/firamono.woff2") format("woff2"); /* Super Modern Browsers */
  }
  /* SERIF FONT */

  /* alegreya-regular - latin */
  @font-face {
    font-family: "Alegreya";
    font-style: normal;
    font-weight: 400;
    font-display: optional;
    src: url("../fonts/alegreya.woff2") format("woff2"); /* Super Modern Browsers */
  }

  /*  */

  .blah {
    border: green solid 4px;
    font-style: oblique;
  }

  /* INJECTING TAILWIND THEME VALUES INTO CSS */
  /* ALSO PARSING OUT TAILWIND CLASSES INTO CSS */
  body {
    /* border: green solid 2px; */
    --webkit-tap-highlight-color: ${theme`colors.purple.500`};
    ${tw`antialiased`}
  }

  /* TRANSITIONS FOR COLOR MODE */

  /* html.dark * {
    transition-property: all;
    transition-duration: 0.4s;
    transition-timing-function: ease-in;
  }

  html.light * {
    transition-property: all;
    transition-duration: 0.4s;
    transition-timing-function: ease-in;
  } */

  html.header-visible {
    overflow-y: auto;
  }

  html.cart-visible {
    overflow-y: hidden;
  }
`;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
);

export default GlobalStyles;
