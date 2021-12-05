/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { useState, useEffect, Fragment } from "react";
import tw, { css, styled, theme } from "twin.macro";

// import { useTheme as useColorMode } from "next-themes";

import { useActor } from "@xstate/react";

import { headerNCartService } from "@/machines/header_n_cart_machine";

import PageLoadingIndiccator from "./loaders/PageLoadingIndicator";
import NavMenu from "./navigation/NavMenu";
import ShoppingCart from "./cart/ShoppingCart";
import Search from "./Search";

import { cartService, EE, fse } from "@/machines/cart_machine";

const Header: FC = ({ children }) => {
  const [____, cartDispatch] = useActor(cartService);

  useEffect(() => {
    cartDispatch({ type: EE.CHECK });
  }, [cartDispatch]);

  // const {  theme } = useColorMode();

  const [headerNCartServiceInitiallized, setHeaderAndCartServiceInitialized] =
    useState<boolean>(false);

  useEffect(() => {
    if (!headerNCartService.initialized) {
      headerNCartService.start();
      setHeaderAndCartServiceInitialized(true);
    }
  }, [headerNCartServiceInitiallized, setHeaderAndCartServiceInitialized]);

  return (
    <Fragment>
      <header
        css={[
          css`
            transition-property: background-color;
            transition-duration: 600ms;
          `,
          tw`overflow-hidden md:overflow-visible z-index[2000] sticky top-0 dark:bg-gray-800 light:bg-l`,
        ]}
      >
        <PageLoadingIndiccator />
        <NavMenu />
        <ShoppingCart />
        {children}
      </header>
      <Search />
    </Fragment>
  );
};

export default Header;
