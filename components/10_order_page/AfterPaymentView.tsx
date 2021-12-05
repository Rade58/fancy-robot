/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { PropsI } from "@/pages/order/[orderId]";
import Stringified from "../dev-helpers/Stringified";

import Summary from "./Summary";

const AfterPaymentView: FC<{ order: PropsI["order"] }> = ({ order }) => {
  return (
    <section css={[tw``]}>
      {/* <div
        css={css`
          background-color: ${theme`colors.electric`};
          width: 100vw;
          height: 100vh;
          border: pink solid 2px;
        `}
      >
        <Stringified data={order} />
      </div> */}
      {/*  */}
      <Summary order={order} />
    </section>
  );
};

export default AfterPaymentView;
