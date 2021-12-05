/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { useActor } from "@xstate/react";

import Lorem from "@/components/dev-helpers/Lorem";
import Stringified from "@/components/dev-helpers/Stringified";
// import PayPalThing from "./PayPalThing";
import PaymentButtons from "./PaymentButtons";
import OrderDetails from "./OrderDetails";
import PriceInfo from "./PriceInfo";
import AfterPaymentView from "./AfterPaymentView";

import { orderService } from "@/machines/order_machine";

import type { PropsI } from "@/pages/order/[orderId]";

const Layout: FC<PropsI> = (props) => {
  const { order: initialOrder, sumasAndPrices } = props;

  const [
    {
      context: { refetchedOrderAndPaymentRecord, updatedOrderRefetched },
    },
  ] = useActor(orderService);

  // console.log({ refetchedOrderAndPaymentRecord });

  const order =
    (refetchedOrderAndPaymentRecord !== null
      ? refetchedOrderAndPaymentRecord["order"]
      : null) || initialOrder;

  // console.log({ refetchedOrderAndPaymentRecord, initialOrder, order });

  const status = order.status;

  const notPayed = status === "AWAITING_PAYMENT_RESOLVEMENT";
  const payed = status === "FULFILLED";
  const orderIsPayed = notPayed === false && payed === true;

  // console.log({ favorites });

  // console.log("Place Order Page");
  // console.log({ order });

  return (
    <main
      css={[
        tw`min-height[89.8vh]  flex flex-col align-content[center] align-items[center] justify-center`,
        tw``,
      ]}
    >
      {orderIsPayed && <AfterPaymentView order={order} />}
      {/*  */}
      {/* {!orderIsPayed && <Stringified data={{ order, sumasAndPrices }} />} */}
      {/* <PayPalThing order={order} sumasAndPrices={sumasAndPrices} /> */}
      {/* <PriceInfo prices={sumasAndPrices} /> */}
      {!orderIsPayed && (
        <PaymentButtons order={order} sumasAndPrices={sumasAndPrices} />
      )}
      {/* <OrderDetails {...props} /> */}
    </main>
  );
};

export default Layout;
