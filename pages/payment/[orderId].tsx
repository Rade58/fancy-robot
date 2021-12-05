/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

import type { Order } from "@prisma/client";

import prisma from "@/lib/prisma";

import { redirectToSigninIfNoAuth } from "@/lib/intent_nav";

// TODO (USE THIS)
import validateOrder from "@/lib/auth/validateOrder";

import Layout from "@/components/8_payment_page/Layout";

export interface PropsI {
  order: Order;
}

type paramsType = {
  orderId: string;
};

export const getServerSideProps: GetServerSideProps<
  PropsI | { nothing: true },
  paramsType
> = async (ctx) => {
  const { params } = ctx;

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

  // WE NEED TO CHECK IF ORDER ISN'T IN PENDING STATE
  // IF ORDER IS IN PENDING STATE, WE SHOULD REDIRECT
  // TO /shipping/<orderId>

  if (order.status === "PENDING") {
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

  return {
    props: {
      order,
    },
  };
};

const PaymentPage: NP<PropsI> = (props) => {
  //

  console.log(props);

  return (
    <div>
      <Layout order={props.order} />
    </div>
  );
};

export default PaymentPage;
