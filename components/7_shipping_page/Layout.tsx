/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { PropsI } from "@/pages/shipping/[orderId]";

import Lorem from "@/components/dev-helpers/Lorem";

import ShipPayOrdBreadcrumbs from "@/components/breadcrumbs/ShipPayOrdBreadcrumbs";

import ShipBillForm from "./ShippingBillingForm";

const Layout: FC<PropsI> = ({ order, profile }) => {
  // console.log({ favorites });

  return (
    <main css={[tw``, tw``]}>
      <ShipPayOrdBreadcrumbs orderId={order.id} />
      <ShipBillForm initialProfilleInfo={profile} />
    </main>
  );
};

export default Layout;
