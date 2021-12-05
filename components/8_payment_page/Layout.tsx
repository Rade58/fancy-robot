/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { PropsI } from "@/pages/payment/[orderId]";

import Lorem from "@/components/dev-helpers/Lorem";

import ShipPayOrdBreadcrumbs from "@/components/breadcrumbs/ShipPayOrdBreadcrumbs";

import PickPayment from "./PickPayment";

const Layout: FC<PropsI> = ({ order }) => {
  // console.log({ favorites });

  return (
    <main css={[tw``, tw``]}>
      <ShipPayOrdBreadcrumbs orderId={order.id} />
      <PickPayment order={order} />
    </main>
  );
};

export default Layout;
