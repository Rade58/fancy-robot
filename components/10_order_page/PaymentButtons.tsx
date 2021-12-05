/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { useActor } from "@xstate/react";
import tw, { css, styled, theme } from "twin.macro";

import type { PropsI } from "@/pages/order/[orderId]";
import PayPalThing from "./PayPalThing";
import PriceInfo from "./PriceInfo";

import { orderService } from "@/machines/order_machine";

const PaymentButtons: FC<PropsI> = ({
  order: initialOrder,
  sumasAndPrices,
}) => {
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

  // console.log({ order });
  // console.log({ initialOrder });

  return (
    <>
      {order && order.status !== "FULFILLED" && (
        <>
          <PriceInfo prices={sumasAndPrices} />
          <section
            css={[tw`border-__warning mt-8 px-2.5 md:mx-auto w-full md:w-96`]}
          >
            {/* @ts-ignore */}
            <PayPalThing order={order} sumasAndPrices={sumasAndPrices} />
          </section>
        </>
      )}
    </>
  );
};

export default PaymentButtons;
