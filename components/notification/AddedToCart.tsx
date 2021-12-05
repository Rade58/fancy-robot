/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { useEffect, Fragment, useState } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { useActor } from "@xstate/react";

import { cartService, EE } from "@/machines/cart_machine";

import Alert from "../alerts/Alert";

const AddedToCart: FC = () => {
  const [{ /* value, */ context }, dispatch] = useActor(cartService);

  // console.log({ value, context });
  //
  /* const [historyProductId, setHistoryProductId] = useState<string | undefined>(
    ""
  );

  useEffect(() => {
    setHistoryProductId(context.lastAddedProduct?.id);
  }, [setHistoryProductId, context]);
 */
  // console.log({ ...context.lastAddedProduct });

  return (
    //<section css={[tw`bg-gray-200`, tw`hover:text-indigo-600`]}>
    <Fragment>
      {context.lastAddedProduct && (
        <Alert
          onAnimationComplete={() => {
            // console.log("animation completed");

            setTimeout(() => {
              dispatch({ type: EE.WIPE_LAST_ADED_FROM_HISTORY });
            }, 1266);
          }}
          header="Product Added To Cart"
          text={context.lastAddedProduct?.name || ""}
          variant="success"
          visible
        />
      )}
    </Fragment>
    //</section>
  );
};

export default AddedToCart;
