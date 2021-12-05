/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

// WE ARE GOING TO USE PAYPAL PROVIDER JUST ON THIS
// PAGE
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
//

import type {
  Order,
  OrderElement,
  PaymentResult,
  Profile,
  Product,
} from "@prisma/client";

import prisma from "@/lib/prisma";

import { redirectToSigninIfNoAuth } from "@/lib/intent_nav";
// TODO (USE THIS)
import validateOrder from "@/lib/auth/validateOrder";

import useOrderService from "@/hooks/useOrderService";

import {
  calculateTotalPrice,
  calculatePriceWithoutShipping,
} from "@/lib/order/calculateOrderPrice";
import formatPrice from "@/util/formatPrice";

import type { ExpectedDataProps } from "../place-order/[orderId]";

import Layout from "@/components/10_order_page/Layout";

export interface PropsI {
  sumasAndPrices: {
    totalPrice: number;
    subtotalPrice: number;
    taxPricePercentage: number;
    shippingPrice: number;
    formated: {
      totalPrice: string;
      subtotalPrice: string;
      shippingPrice: string;
    };
  };
  order: Order & {
    buyer: Profile;
    paymentResult: PaymentResult | null;
    items: (OrderElement & {
      product: Product;
    })[];
  };
}

type paramsType = {
  orderId: string;
};

export const getServerSideProps: GetServerSideProps<
  PropsI | { nothing: true },
  paramsType
> = async (ctx) => {
  const { params } = ctx;

  params?.orderId; //

  // TODO
  // CHECKING AUTHENTICATION/AUTHORIZATION
  // REDIRECTING IF SOMETHING IS WRONG
  // FETCHING ORDER
  // CHECKING STATUS OF AN ORDER
  // MAKING CALCULATIONS
  // PASSING TOTAL PRICE
  // AND SUBTOTAL PRICE
  // AND SHIPPING PRICE, AND MAYBE SOME OTHER THINGS
  // NAME OF THE USER
  // AND MAYBE ALSO A ID OF AN ORDER

  const redirectOptions = await redirectToSigninIfNoAuth(ctx, "/signin");

  if (redirectOptions.status === "unauthenticated") {
    return {
      props: {
        nothing: true,
      },
      redirect: redirectOptions.redirect,
    };
  }

  // WE WILL CHECK IF ORDER EXISTS
  // IF NOT WE ARE GOING TO REDIRRECT TO THE MAIN PAGE

  // WE WILL CHECK IF ORDER EXISTS
  // IF NOT WE ARE GOING TO REDIRRECT TO THE MAIN PAGE
  const order = await validateOrder(ctx);
  if (order === "unauthorized" || order === "unauthenticated") {
    return {
      props: {
        nothing: true,
      },
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  if (
    order.status === "PENDING" ||
    order.status === "AWAITING_PAYMENT_METHOD" ||
    order.status === "AWAITING_ORDER_PLACEMENT"
  ) {
    return {
      props: {
        nothing: true,
      },
      redirect: {
        destination: `/shipping/${order.id}`,
        permanent: false,
      },
    };
  }

  // WE SHOULD DO BUNCH OF JOINS HERE BECAUSE WE WANT TO CALCULATE ALL PRICES

  const orderWithMoreData = await prisma.order.findUnique({
    where: {
      id: order.id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      buyer: true,
      paymentResult: true,
    },
  });

  if (!orderWithMoreData) {
    return {
      props: {
        nothing: true,
      },
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  const sumasAndPrices = {
    totalPrice: calculateTotalPrice(
      orderWithMoreData as ExpectedDataProps["order"]
    ),
    subtotalPrice: calculatePriceWithoutShipping(
      orderWithMoreData as ExpectedDataProps["order"]
    ),
    taxPricePercentage: orderWithMoreData.taxPrice as number,
    shippingPrice: parseFloat(orderWithMoreData.shippingPrice),
    formated: {
      totalPrice: "",
      subtotalPrice: "",
      shippingPrice: "",
    },
  };

  sumasAndPrices["formated"].totalPrice = formatPrice(
    sumasAndPrices.totalPrice,
    "EUR"
  ) as string;
  sumasAndPrices["formated"].subtotalPrice = formatPrice(
    sumasAndPrices.subtotalPrice,
    "EUR"
  ) as string;
  sumasAndPrices["formated"].shippingPrice = formatPrice(
    sumasAndPrices.shippingPrice,
    "EUR"
  ) as string;
  //

  const props = {
    sumasAndPrices,
    order: orderWithMoreData,
  };

  return {
    props: props,
  };
};

const Page: NP<PropsI> = (props) => {
  useOrderService();
  console.log({ props });
  //

  // console.log({ props });

  return <Layout {...props} />;

  return (
    <PayPalScriptProvider
      options={{
        "client-id": "test",
      }}
      deferLoading
    >
      <Layout {...props} />
    </PayPalScriptProvider>
  );
};

export default Page;
