/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC } from "react";

const CommonSeo: FC = () => {
  return (
    <>
      {/* FONTS */}
      <link
        rel="preload"
        href="/fonts/intervar.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/intervarroman.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/intervaritalic.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/firamono.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/alegreya.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      {/* COMMON META TAGS */}
      <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
    </>
  );
};

export default CommonSeo;
