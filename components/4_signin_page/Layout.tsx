/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

// import type { PropsI } from "@/pages/product/[productId]";

import SignInForm from "../auth/SignInForm";

import type { PropsI } from "@/pages/signin";

const Layout: FC<PropsI> = ({ children, unauthPath }) => {
  return (
    <main>
      {children}
      <SignInForm unauthPath={unauthPath} />

      {/*  */}
    </main>
  );
};

export default Layout;
