/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

import type { Order, OrderElement, Product, Profile } from "@prisma/client";

import prisma from "@/lib/prisma";

import { redirectToSigninIfNoAuth } from "@/lib/intent_nav";

// TODO (USE THIS)
import validateOrder from "@/lib/auth/validateOrder";

import Layout from "@/components/9_place_order_page/Layout";

export interface PropsI {
  order: Order & {
    items: (OrderElement & {
      product: {
        image: string;
        name: string;
        price: string;
      };
    })[];
    buyer: {
      city: string | null;
      country: string | null;
      postalCode: string | null;
      nick: string | null;
      email: string | null;
      regionOrState: string | null;
      streetAddress: string | null;
    };
  };
}

export interface ExpectedDataProps {
  order: Order & {
    items: (OrderElement & {
      product: {
        image: string;
        name: string;
        price: string;
      };
    })[];
    buyer: {
      city: string;
      country: string;
      postalCode: string;
      nick: string;
      email: string;
      regionOrState: string;
      streetAddress: string;
    };
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
    order.status === "AWAITING_PAYMENT_METHOD"
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

  // WE NEED TO GET ORDER AND MAKE BUNCH OF JOINS
  // BECAUSE WE WANT ALL DATA RELATED TO ORDER
  // WE NEED PRODUCT INFO BECAUSE ON THIS PAGE WE RE GOING
  // TO PRESENT SUMMARY TO THE USER

  const ord = await prisma.order.findUnique({
    where: {
      id: order.id,
    },
    include: {
      items: {
        include: {
          product: {
            select: {
              image: true,
              name: true,
              price: true,
            },
          },
        },
      },
      buyer: {
        select: {
          city: true,
          country: true,
          postalCode: true,
          nick: true,
          email: true,
          regionOrState: true,
          streetAddress: true,
        },
      },
    },
  });

  if (!ord) {
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

  return {
    props: {
      order: ord,
    },
  };
};

const PlaceOrderPage: NP<PropsI> = (props) => {
  //

  console.log(props);

  return (
    <div>
      <Layout order={props.order as ExpectedDataProps["order"]} />
    </div>
  );
};

export default PlaceOrderPage;
