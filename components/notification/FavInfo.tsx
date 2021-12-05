/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { useEffect, Fragment, useState } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { useActor } from "@xstate/react";

import { cartService, EE } from "@/machines/cart_machine";

import Alert from "../alerts/Alert";

const FavInfo: FC<{
  productName: string;
}> = ({ productName }) => {
  return (
    //<section css={[tw`bg-gray-200`, tw`hover:text-indigo-600`]}>
    <Fragment>
      {/* {context.lastAddedProduct && ( */}
      <Alert
        onAnimationComplete={() => {
          //
        }}
        header="Product Added To Favorites"
        text={productName}
        variant="info"
        visible
      />
      {/* )} */}
    </Fragment>
    //</section>
  );
};

export default FavInfo;
